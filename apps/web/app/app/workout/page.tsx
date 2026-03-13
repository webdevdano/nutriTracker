"use client";

import { useState, useMemo, useCallback } from "react";

// ── Constants ──────────────────────────────────────────────────────────────────

const CARDIO_ACTIVITIES = [
  { value: "RUNNING",       label: "🏃 Running" },
  { value: "WALKING",       label: "🚶 Walking" },
  { value: "CYCLING",       label: "🚴 Cycling" },
  { value: "SWIMMING",      label: "🏊 Swimming" },
  { value: "ROWING",        label: "🚣 Rowing" },
  { value: "ELLIPTICAL",    label: "⭕ Elliptical" },
  { value: "STAIR_CLIMBER", label: "🪜 Stair Climber" },
  { value: "JUMP_ROPE",     label: "⭕ Jump Rope" },
  { value: "HIIT",          label: "🔥 HIIT" },
  { value: "HIKING",        label: "🥾 Hiking" },
  { value: "OTHER",         label: "🏋️ Other" },
];

const MUSCLE_GROUPS = [
  { value: "CHEST",       label: "Chest" },
  { value: "BACK",        label: "Back" },
  { value: "SHOULDERS",   label: "Shoulders" },
  { value: "BICEPS",      label: "Biceps" },
  { value: "TRICEPS",     label: "Triceps" },
  { value: "FOREARMS",    label: "Forearms" },
  { value: "CORE",        label: "Core" },
  { value: "QUADS",       label: "Quads" },
  { value: "HAMSTRINGS",  label: "Hamstrings" },
  { value: "GLUTES",      label: "Glutes" },
  { value: "CALVES",      label: "Calves" },
  { value: "FULL_BODY",   label: "Full Body" },
  { value: "OTHER",       label: "Other" },
];

const ACTIVITY_EMOJI: Record<string, string> = {
  RUNNING: "🏃", WALKING: "🚶", CYCLING: "🚴", SWIMMING: "🏊",
  ROWING: "🚣", ELLIPTICAL: "⭕", STAIR_CLIMBER: "🪜", JUMP_ROPE: "⭕",
  HIIT: "🔥", HIKING: "🥾", OTHER: "🏋️",
};

// ── Types ──────────────────────────────────────────────────────────────────────

type CardioLog = {
  id: string;
  activity: string;
  durationMins: number | null;
  distanceMiles: string | null;
  caloriesBurned: number | null;
  avgHeartRate: number | null;
  maxHeartRate: number | null;
  pace: string | null;
  notes: string | null;
};

type ExerciseSet = {
  id: string;
  exerciseName: string;
  muscleGroup: string;
  setNumber: number;
  reps: number | null;
  weightLbs: string | null;
  durationSecs: number | null;
};

type WorkoutSession = {
  id: string;
  date: string;
  name: string | null;
  notes: string | null;
  durationMins: number | null;
  caloriesBurned: number | null;
  cardioLogs: CardioLog[];
  exerciseSets: ExerciseSet[];
};

type SetRow = { reps: string; weightLbs: string };

type ExerciseEntry = {
  localId: string;
  exerciseName: string;
  muscleGroup: string;
  sets: SetRow[];
};

// ── Helpers ────────────────────────────────────────────────────────────────────

function today() {
  return new Date().toISOString().split("T")[0];
}

function fmtDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "short", month: "short", day: "numeric",
  });
}

function newEntry(): ExerciseEntry {
  return {
    localId: Math.random().toString(36).slice(2),
    exerciseName: "",
    muscleGroup: "CHEST",
    sets: [{ reps: "", weightLbs: "" }],
  };
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function WorkoutPage() {
  const [sessions, setSessions] = useState<WorkoutSession[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Form state
  const [tab, setTab] = useState<"cardio" | "strength">("cardio");
  const [showForm, setShowForm] = useState(false);

  // Cardio form
  const [cActivity, setCActivity] = useState("RUNNING");
  const [cDuration, setCDuration] = useState("");
  const [cDistance, setCDistance] = useState("");
  const [cCalories, setCCalories] = useState("");
  const [cHR, setCHR] = useState("");
  const [cDate, setCDate] = useState(today);
  const [cNotes, setCNotes] = useState("");

  // Strength form
  const [sDate, setSDate] = useState(today);
  const [sName, setSName] = useState("");
  const [sNotes, setSNotes] = useState("");
  const [exercises, setExercises] = useState<ExerciseEntry[]>([newEntry()]);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  // ── Load sessions ─────────────────────────────────────────────────────────

  const loadSessions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/workouts?limit=50");
      if (res.ok) {
        const { sessions: data } = await res.json();
        setSessions(data);
        setLoaded(true);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Progressive overload lookup ───────────────────────────────────────────

  const lastSetsFor = useCallback(
    (name: string): ExerciseSet[] => {
      if (!name.trim()) return [];
      const lower = name.toLowerCase();
      for (const s of sessions) {
        const matched = s.exerciseSets.filter(
          (e) => e.exerciseName.toLowerCase() === lower
        );
        if (matched.length) return matched;
      }
      return [];
    },
    [sessions]
  );

  // ── Submit cardio ─────────────────────────────────────────────────────────

  async function handleCardioSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!cActivity || !cDuration) return;
    setSaving(true);
    try {
      const res = await fetch("/api/workouts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: cDate,
          name: CARDIO_ACTIVITIES.find((a) => a.value === cActivity)?.label.replace(/^.{2}/, "").trim(),
          durationMins: cDuration,
          caloriesBurned: cCalories || undefined,
          cardioLogs: [{
            activity: cActivity,
            durationMins: cDuration,
            distanceMiles: cDistance || undefined,
            caloriesBurned: cCalories || undefined,
            avgHeartRate: cHR || undefined,
            notes: cNotes || undefined,
          }],
        }),
      });
      if (res.ok) {
        const { session } = await res.json();
        setSessions((prev) => [session, ...prev]);
        setCDuration(""); setCDistance(""); setCCalories(""); setCHR(""); setCNotes("");
        setShowForm(false);
        showToast("Cardio logged!");
      } else {
        showToast("Failed to save.");
      }
    } finally {
      setSaving(false);
    }
  }

  // ── Submit strength ───────────────────────────────────────────────────────

  async function handleStrengthSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validExercises = exercises.filter(
      (ex) => ex.exerciseName.trim() && ex.sets.some((s) => s.reps || s.weightLbs)
    );
    if (!validExercises.length) return;

    const exerciseSets = validExercises.flatMap((ex) =>
      ex.sets
        .filter((s) => s.reps || s.weightLbs)
        .map((s, i) => ({
          exerciseName: ex.exerciseName.trim(),
          muscleGroup: ex.muscleGroup,
          setNumber: i + 1,
          reps: s.reps || undefined,
          weightLbs: s.weightLbs || undefined,
        }))
    );

    setSaving(true);
    try {
      const res = await fetch("/api/workouts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: sDate,
          name: sName.trim() || undefined,
          notes: sNotes.trim() || undefined,
          exerciseSets,
        }),
      });
      if (res.ok) {
        const { session } = await res.json();
        setSessions((prev) => [session, ...prev]);
        setSName(""); setSNotes(""); setExercises([newEntry()]);
        setShowForm(false);
        showToast("Workout logged!");
      } else {
        showToast("Failed to save.");
      }
    } finally {
      setSaving(false);
    }
  }

  // ── Delete session ────────────────────────────────────────────────────────

  async function handleDelete(id: string) {
    const res = await fetch(`/api/workouts/${id}`, { method: "DELETE" });
    if (res.ok) {
      setSessions((prev) => prev.filter((s) => s.id !== id));
      setDeleteId(null);
      showToast("Deleted.");
    }
  }

  // ── Exercise entry helpers ────────────────────────────────────────────────

  function updateExercise(localId: string, patch: Partial<ExerciseEntry>) {
    setExercises((prev) =>
      prev.map((ex) => (ex.localId === localId ? { ...ex, ...patch } : ex))
    );
  }

  function updateSet(localId: string, setIdx: number, patch: Partial<SetRow>) {
    setExercises((prev) =>
      prev.map((ex) =>
        ex.localId === localId
          ? { ...ex, sets: ex.sets.map((s, i) => (i === setIdx ? { ...s, ...patch } : s)) }
          : ex
      )
    );
  }

  function addSet(localId: string) {
    setExercises((prev) =>
      prev.map((ex) =>
        ex.localId === localId ? { ...ex, sets: [...ex.sets, { reps: "", weightLbs: "" }] } : ex
      )
    );
  }

  function removeSet(localId: string, setIdx: number) {
    setExercises((prev) =>
      prev.map((ex) =>
        ex.localId === localId
          ? { ...ex, sets: ex.sets.filter((_, i) => i !== setIdx) }
          : ex
      )
    );
  }

  function removeExercise(localId: string) {
    setExercises((prev) => prev.filter((ex) => ex.localId !== localId));
  }

  // ── Derived: grouped history ──────────────────────────────────────────────

  const cardioHistory = useMemo(
    () => sessions.filter((s) => s.cardioLogs.length > 0),
    [sessions]
  );

  const strengthHistory = useMemo(
    () => sessions.filter((s) => s.exerciseSets.length > 0),
    [sessions]
  );

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 pb-28 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Workouts</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Track cardio &amp; strength sessions</p>
        </div>
        <button
          onClick={() => {
            if (!loaded) loadSessions();
            setShowForm((v) => !v);
          }}
          className="flex items-center gap-1.5 rounded-full bg-[#4169E1] px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-[#3158d0] dark:bg-[#87CEEB] dark:text-black dark:hover:bg-[#6bb8d8]"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          {showForm ? "Cancel" : "Log Workout"}
        </button>
      </div>

      {/* Log form */}
      {showForm && (
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          {/* Type tabs */}
          <div className="mb-5 flex gap-2">
            {(["cardio", "strength"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold capitalize transition ${
                  tab === t
                    ? "bg-[#4169E1] text-white dark:bg-[#87CEEB] dark:text-black"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
                }`}
              >
                {t === "cardio" ? "🏃 Cardio" : "🏋️ Strength"}
              </button>
            ))}
          </div>

          {/* ── Cardio form ── */}
          {tab === "cardio" && (
            <form onSubmit={handleCardioSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Activity</label>
                  <select
                    value={cActivity}
                    onChange={(e) => setCActivity(e.target.value)}
                    className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  >
                    {CARDIO_ACTIVITIES.map((a) => (
                      <option key={a.value} value={a.value}>{a.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Date</label>
                  <input
                    type="date"
                    value={cDate}
                    onChange={(e) => setCDate(e.target.value)}
                    className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Duration (min) *</label>
                  <input
                    type="number" min="1" required
                    value={cDuration} onChange={(e) => setCDuration(e.target.value)}
                    placeholder="30"
                    className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Distance (mi)</label>
                  <input
                    type="number" min="0" step="0.01"
                    value={cDistance} onChange={(e) => setCDistance(e.target.value)}
                    placeholder="3.1"
                    className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Calories</label>
                  <input
                    type="number" min="0"
                    value={cCalories} onChange={(e) => setCCalories(e.target.value)}
                    placeholder="300"
                    className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Avg HR (bpm)</label>
                  <input
                    type="number" min="0"
                    value={cHR} onChange={(e) => setCHR(e.target.value)}
                    placeholder="145"
                    className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Notes</label>
                <input
                  type="text"
                  value={cNotes} onChange={(e) => setCNotes(e.target.value)}
                  placeholder="Optional note..."
                  className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>

              <button
                type="submit" disabled={saving}
                className="w-full rounded-xl bg-[#4169E1] py-2.5 text-sm font-semibold text-white transition hover:bg-[#3158d0] disabled:opacity-60 dark:bg-[#87CEEB] dark:text-black"
              >
                {saving ? "Saving…" : "Save Cardio"}
              </button>
            </form>
          )}

          {/* ── Strength form ── */}
          {tab === "strength" && (
            <form onSubmit={handleStrengthSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Session Name</label>
                  <input
                    type="text"
                    value={sName} onChange={(e) => setSName(e.target.value)}
                    placeholder="e.g. Push Day"
                    className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Date</label>
                  <input
                    type="date"
                    value={sDate} onChange={(e) => setSDate(e.target.value)}
                    className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  />
                </div>
              </div>

              {exercises.map((ex, exIdx) => {
                const prev = lastSetsFor(ex.exerciseName);
                return (
                  <div key={ex.localId} className="rounded-xl border border-zinc-200 p-3 dark:border-zinc-700">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500">#{exIdx + 1}</span>
                      <input
                        type="text"
                        value={ex.exerciseName}
                        onChange={(e) => updateExercise(ex.localId, { exerciseName: e.target.value })}
                        placeholder="Exercise name (e.g. Bench Press)"
                        className="flex-1 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                      />
                      <select
                        value={ex.muscleGroup}
                        onChange={(e) => updateExercise(ex.localId, { muscleGroup: e.target.value })}
                        className="rounded-lg border border-zinc-200 bg-white px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                      >
                        {MUSCLE_GROUPS.map((m) => (
                          <option key={m.value} value={m.value}>{m.label}</option>
                        ))}
                      </select>
                      {exercises.length > 1 && (
                        <button type="button" onClick={() => removeExercise(ex.localId)}
                          className="text-zinc-400 hover:text-red-500">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>

                    {/* Progressive overload hint */}
                    {prev.length > 0 && (
                      <div className="mb-2 rounded-lg bg-amber-50 px-3 py-1.5 text-xs text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">
                        Last session: {prev.map((s) => `${s.weightLbs ? `${s.weightLbs} lbs` : "—"} × ${s.reps ?? "—"}`).join(" · ")}
                      </div>
                    )}

                    {/* Set rows */}
                    <div className="space-y-1.5">
                      <div className="grid grid-cols-[40px_1fr_1fr_32px] gap-1.5 text-xs font-medium text-zinc-400">
                        <span>Set</span><span>Reps</span><span>Weight (lbs)</span><span />
                      </div>
                      {ex.sets.map((s, sIdx) => (
                        <div key={sIdx} className="grid grid-cols-[40px_1fr_1fr_32px] items-center gap-1.5">
                          <span className="text-center text-xs text-zinc-500">{sIdx + 1}</span>
                          <input
                            type="number" min="0"
                            value={s.reps} onChange={(e) => updateSet(ex.localId, sIdx, { reps: e.target.value })}
                            placeholder="8"
                            className="rounded-md border border-zinc-200 bg-white px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                          />
                          <input
                            type="number" min="0" step="2.5"
                            value={s.weightLbs} onChange={(e) => updateSet(ex.localId, sIdx, { weightLbs: e.target.value })}
                            placeholder="135"
                            className="rounded-md border border-zinc-200 bg-white px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                          />
                          {ex.sets.length > 1 && (
                            <button type="button" onClick={() => removeSet(ex.localId, sIdx)}
                              className="text-zinc-300 hover:text-red-400">
                              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    <button type="button" onClick={() => addSet(ex.localId)}
                      className="mt-2 text-xs text-[#4169E1] hover:underline dark:text-[#87CEEB]">
                      + Add set
                    </button>
                  </div>
                );
              })}

              <button type="button" onClick={() => setExercises((prev) => [...prev, newEntry()])}
                className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-zinc-300 py-2 text-sm text-zinc-500 hover:border-[#4169E1] hover:text-[#4169E1] dark:border-zinc-600 dark:hover:border-[#87CEEB] dark:hover:text-[#87CEEB]">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Add exercise
              </button>

              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Session notes</label>
                <input
                  type="text" value={sNotes} onChange={(e) => setSNotes(e.target.value)}
                  placeholder="Optional note..."
                  className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4169E1] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>

              <button
                type="submit" disabled={saving}
                className="w-full rounded-xl bg-[#4169E1] py-2.5 text-sm font-semibold text-white transition hover:bg-[#3158d0] disabled:opacity-60 dark:bg-[#87CEEB] dark:text-black"
              >
                {saving ? "Saving…" : "Save Workout"}
              </button>
            </form>
          )}
        </div>
      )}

      {/* Load history button */}
      {!loaded && !showForm && (
        <button
          onClick={loadSessions}
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-white py-4 text-sm font-medium text-zinc-600 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          {loading ? (
            <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          ) : (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          {loading ? "Loading…" : "Load workout history"}
        </button>
      )}

      {/* ── History ── */}
      {loaded && sessions.length === 0 && (
        <div className="rounded-2xl border border-zinc-200 bg-white py-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-3xl">🏋️</p>
          <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">No workouts logged yet.</p>
          <button onClick={() => setShowForm(true)}
            className="mt-3 text-sm font-medium text-[#4169E1] hover:underline dark:text-[#87CEEB]">
            Log your first workout
          </button>
        </div>
      )}

      {loaded && sessions.length > 0 && (
        <div className="space-y-6">
          {/* Cardio history */}
          {cardioHistory.length > 0 && (
            <section>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                🏃 Cardio
              </h2>
              <div className="space-y-3">
                {cardioHistory.map((s) =>
                  s.cardioLogs.map((c) => (
                    <div key={c.id} className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{ACTIVITY_EMOJI[c.activity] ?? "🏃"}</span>
                          <div>
                            <p className="font-semibold text-zinc-900 dark:text-white">
                              {c.activity.charAt(0) + c.activity.slice(1).toLowerCase().replace("_", " ")}
                            </p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">{fmtDate(s.date)}</p>
                          </div>
                        </div>
                        <button onClick={() => setDeleteId(s.id)}
                          className="text-zinc-300 hover:text-red-400 dark:text-zinc-600">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {c.durationMins && (
                          <Chip label={`${c.durationMins} min`} icon="⏱" />
                        )}
                        {c.distanceMiles && (
                          <Chip label={`${parseFloat(c.distanceMiles).toFixed(2)} mi`} icon="📍" />
                        )}
                        {c.caloriesBurned && (
                          <Chip label={`${c.caloriesBurned} cal`} icon="🔥" />
                        )}
                        {c.avgHeartRate && (
                          <Chip label={`${c.avgHeartRate} bpm avg`} icon="❤️" />
                        )}
                      </div>
                      {c.notes && (
                        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 italic">{c.notes}</p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </section>
          )}

          {/* Strength history */}
          {strengthHistory.length > 0 && (
            <section>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                🏋️ Strength
              </h2>
              <div className="space-y-3">
                {strengthHistory.map((s) => {
                  // Group sets by exercise name
                  const grouped = s.exerciseSets.reduce<Record<string, ExerciseSet[]>>((acc, e) => {
                    acc[e.exerciseName] = acc[e.exerciseName] ?? [];
                    acc[e.exerciseName].push(e);
                    return acc;
                  }, {});

                  return (
                    <div key={s.id} className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-zinc-900 dark:text-white">
                            {s.name || "Strength Session"}
                          </p>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">{fmtDate(s.date)}</p>
                        </div>
                        <button onClick={() => setDeleteId(s.id)}
                          className="text-zinc-300 hover:text-red-400 dark:text-zinc-600">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>

                      <div className="mt-3 space-y-2">
                        {Object.entries(grouped).map(([name, sets]) => (
                          <div key={name} className="rounded-lg bg-zinc-50 px-3 py-2 dark:bg-zinc-800">
                            <p className="mb-1 text-xs font-semibold text-zinc-700 dark:text-zinc-200">
                              {name}
                              <span className="ml-2 font-normal text-zinc-400">
                                {MUSCLE_GROUPS.find((m) => m.value === sets[0].muscleGroup)?.label}
                              </span>
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {sets.map((set) => (
                                <span key={set.id}
                                  className="rounded-md bg-white px-2 py-0.5 text-xs text-zinc-600 shadow-sm dark:bg-zinc-700 dark:text-zinc-300">
                                  {set.weightLbs ? `${set.weightLbs} lbs` : "BW"} × {set.reps ?? "—"}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {s.notes && (
                        <p className="mt-2 text-xs italic text-zinc-500 dark:text-zinc-400">{s.notes}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      )}

      {/* Delete confirm dialog */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900">
            <p className="text-center text-zinc-800 dark:text-zinc-100">Delete this workout session?</p>
            <div className="mt-5 flex gap-3">
              <button onClick={() => setDeleteId(null)}
                className="flex-1 rounded-xl border border-zinc-200 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteId)}
                className="flex-1 rounded-xl bg-red-500 py-2 text-sm font-semibold text-white transition hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full bg-zinc-900 px-4 py-2 text-sm text-white shadow-lg dark:bg-zinc-100 dark:text-zinc-900">
          {toast}
        </div>
      )}
    </div>
  );
}

// ── Small chip component ───────────────────────────────────────────────────────

function Chip({ label, icon }: { label: string; icon: string }) {
  return (
    <span className="flex items-center gap-1 rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
      <span>{icon}</span>{label}
    </span>
  );
}
