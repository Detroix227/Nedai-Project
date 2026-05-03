import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Clock, Edit2, Trash2 } from "lucide-react";

import { AppShell } from "@/components/AppShell";
import { useAuthStore } from "@/modules/auth/useAuthStore";
import type { TimetableActivity, Weekday } from "@/modules/contracts";
import { useTimetableStore } from "@/modules/timetable/useTimetableStore";

const weekdays: Weekday[] = [
  "MONDAY",
  "TUESDAY", 
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

function labelForWeekday(day: Weekday) {
  return `${day.slice(0, 1)}${day.slice(1).toLowerCase()}`;
}

export default function TimetableScreen() {
  const token = useAuthStore((state) => state.accessToken);
  const activities = useTimetableStore((state) => state.activities);
  const status = useTimetableStore((state) => state.status);
  const errorMessage = useTimetableStore((state) => state.errorMessage);
  const loadActivities = useTimetableStore((state) => state.loadActivities);
  const createActivity = useTimetableStore((state) => state.createActivity);
  const updateActivity = useTimetableStore((state) => state.updateActivity);
  const deleteActivity = useTimetableStore((state) => state.deleteActivity);
  
  const [editingActivityId, setEditingActivityId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState<Weekday>("MONDAY");
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("09:00");
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      void loadActivities(token);
    }
  }, [loadActivities, token]);

  const groupedActivities = useMemo(
    () =>
      weekdays.map((day) => ({
        day,
        items: activities.filter((activity) => activity.dayOfWeek === day),
      })),
    [activities],
  );

  function resetForm() {
    setEditingActivityId(null);
    setName("");
    setDayOfWeek("MONDAY");
    setStartTime("08:00");
    setEndTime("09:00");
    setLocalError(null);
  }

  function beginEdit(activity: TimetableActivity) {
    setEditingActivityId(activity.id);
    setName(activity.name);
    setDayOfWeek(activity.dayOfWeek);
    setStartTime(activity.startTime);
    setEndTime(activity.endTime);
    setLocalError(null);
  }

  async function handleSave() {
    if (!token) {
      return;
    }

    if (!name.trim()) {
      setLocalError("Activity name is required.");
      return;
    }

    if (endTime <= startTime) {
      setLocalError("End time must be after start time.");
      return;
    }

    setLocalError(null);

    try {
      if (editingActivityId) {
        await updateActivity(token, editingActivityId, {
          name: name.trim(),
          dayOfWeek,
          startTime,
          endTime,
        });
      } else {
        await createActivity(token, {
          name: name.trim(),
          dayOfWeek,
          startTime,
          endTime,
        });
      }

      resetForm();
    } catch (error) {
      console.error("Save failed:", error);
    }
  }

  async function handleDelete(activityId: string) {
    if (!token) return;
    try {
      await deleteActivity(token, activityId);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  }

  return (
    <AppShell
      title="Timetable"
    >
      <div className="flex flex-col h-[calc(100vh-72px)] w-full max-w-6xl mx-auto p-6 overflow-y-auto">
        {/* Form Section */}
        <div className="rounded-3xl bg-white p-6 mb-6 shadow-sm border border-slate-100">
          <h1 className="text-xl font-semibold text-slate-900 mb-2">
            Weekly timetable
          </h1>
          <p className="text-sm leading-6 text-slate-500 mb-6">
            Add and manage recurring weekly activities. NedAI will use this
            timetable as part of your chat context.
          </p>

          <div className="space-y-4">
            {/* Activity Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                Activity Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter activity name"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Day of Week */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                Day of the week
              </label>
              <div className="flex flex-wrap gap-2">
                {weekdays.map((day) => (
                  <button
                    key={day}
                    onClick={() => setDayOfWeek(day)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
                      dayOfWeek === day
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {labelForWeekday(day)}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Inputs */}
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                  Start Time
                </label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                  End Time
                </label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Error Message */}
            {localError || errorMessage ? (
              <div className="p-4 bg-red-50 border border-red-200 rounded-2xl">
                <p className="text-sm text-red-600">
                  {localError || errorMessage}
                </p>
              </div>
            ) : null}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                disabled={status === "saving"}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-semibold py-4 rounded-2xl transition flex items-center justify-center"
              >
                {status === "saving" ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                ) : null}
                {status === "saving"
                  ? "Saving..."
                  : editingActivityId
                    ? "Update Activity"
                    : "Add Activity"}
              </button>
              {editingActivityId && (
                <button
                  onClick={resetForm}
                  className="px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-2xl transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Activities List */}
        <div className="flex-1 overflow-y-auto">
          {groupedActivities.map(({ day, items }) => (
            <div key={day} className="mb-6">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">
                {labelForWeekday(day)}
              </h3>
              {items.length > 0 ? (
                <div className="space-y-3">
                  {items.map((activity) => (
                    <div
                      key={activity.id}
                      className="rounded-2xl bg-white p-4 shadow-sm border border-slate-100 hover:shadow-md transition"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 mr-4">
                          <h4 className="text-base font-semibold text-slate-900 mb-2">
                            {activity.name}
                          </h4>
                          <div className="flex items-center text-sm text-slate-500">
                            <Clock size={16} className="mr-2" />
                            {activity.startTime} - {activity.endTime}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => beginEdit(activity)}
                            className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition"
                          >
                            <Edit2 size={16} className="text-slate-700" />
                          </button>
                          <button
                            onClick={() => handleDelete(activity.id)}
                            className="p-2 bg-red-50 hover:bg-red-100 rounded-full transition"
                          >
                            <Trash2 size={16} className="text-red-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-200 px-6 py-8 text-center">
                  <CalendarDays size={48} className="text-slate-300 mx-auto mb-4" />
                  <p className="text-sm text-slate-500">
                    No activities scheduled.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
