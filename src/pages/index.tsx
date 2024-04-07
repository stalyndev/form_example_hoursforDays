/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const initialSchedule = {
  "DOM.": [],
  "LUN.": [],
  "MAR.": [],
  "MIÉ.": [],
  "JUE.": [],
  "VIE.": [],
  "SÁB.": [],
};

function ScheduleForm() {
  const [schedule, setSchedule] = useState<any>(initialSchedule);

  const handleTimeChange = (
    day: string,
    timeIndex: string,
    field: string,
    value: string
  ) => {
    const newSchedule: any = { ...schedule };
    newSchedule[day][timeIndex][field] = value;
    setSchedule(newSchedule);
  };

  const handleDayEnableChange = (day: string) => {
    const newSchedule: any = { ...schedule };
    newSchedule[day] =
      newSchedule[day].length > 0 ? [] : [{ start: "09:00", end: "18:00" }];
    setSchedule(newSchedule);
  };

  const addTimeRange = (day: string) => {
    const newSchedule: any = { ...schedule };
    const lastTimeRange = newSchedule[day][newSchedule[day].length - 1];
    let newStartTime = "09:00"; // Hora de inicio predeterminada si no hay ningún rango existente

    if (lastTimeRange) {
      const lastEndTime = lastTimeRange.end;
      const [lastHour, lastMinute] = lastEndTime.split(":").map(Number);

      // Calcula la siguiente hora como la hora siguiente a la hora de finalización del último rango
      if (lastMinute !== undefined) {
        if (lastMinute < 30) {
          newStartTime = `${lastHour + 1}:00`;
        } else {
          newStartTime = `${lastHour + 1}:00`;
        }
      }
    }

    newSchedule[day].push({ start: newStartTime, end: "18:00" });

    setSchedule(newSchedule);
  };

  const removeTimeRange = (day: string, timeIndex: string) => {
    const newSchedule: any = { ...schedule };
    newSchedule[day].splice(timeIndex, 1);
    setSchedule(newSchedule);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const isAnyDayEnabled = Object.values(schedule).some(
      (day: any) => day.length > 0
    );

    const activeDaysSchedule: any = Object.keys(schedule).reduce(
      (acc: any, day: any) => {
        if (schedule[day].length > 0) {
          acc[day] = schedule[day];
        }
        return acc;
      },
      {}
    );
  };

  return (
    <>
      <Card className="flex w-full flex-row rounded-none bg-gray-900 text-white  justify-center  gap-3 h-screen">
        <div className="m-auto w-1/2 flex  flex-col  gap-4 rounded-md text-white sm:w-fit">
          <div className=" text-center">
            <h1 className="text-3xl font-bold">Registro de horarios</h1>
            <p className="text-sm text-gray-300">
              Formulario para registro de horas disponibles al día (Con rangos)
            </p>
          </div>
          <form onSubmit={handleSubmit} className="rounded-md bg-gray-800 p-2">
            <div className="flex flex-col gap-5 divide-y divide-stone-900 p-5 sm:gap-2">
              {Object.keys(schedule).map((day) => (
                <div
                  key={day}
                  className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:p-4"
                >
                  <div className="flex flex-row items-center gap-2 p-2 sm:h-5 sm:p-0">
                    <Input
                      type="checkbox"
                      className="m-auto !w-4 !p-2"
                      checked={schedule[day].length > 0}
                      onChange={() => handleDayEnableChange(day)}
                    />
                    <div className="w-10">{day}</div>
                  </div>
                  <div className=" flex flex-col justify-between gap-2">
                    {schedule[day].length > 0 ? (
                      schedule[day].map(
                        (
                          time: { start: string; end: string },
                          timeIndex: string
                        ) => (
                          <div
                            key={timeIndex}
                            className="grid w-fit grid-cols-2 justify-center gap-2 sm:flex sm:flex-row"
                          >
                            <Input
                              type="time"
                              className="col-span-1"
                              value={time.start}
                              required
                              onChange={(e) =>
                                handleTimeChange(
                                  day,
                                  timeIndex,
                                  "start",
                                  e.target.value
                                )
                              }
                              disabled={schedule[day].length === 0}
                            />
                            <Input
                              type="time"
                              className="col-span-1"
                              required
                              value={time.end}
                              onChange={(e) =>
                                handleTimeChange(
                                  day,
                                  timeIndex,
                                  "end",
                                  e.target.value
                                )
                              }
                              disabled={schedule[day].length === 0}
                            />
                            <Button
                              type="button"
                              className="col-span-2 w-full justify-center bg-red-500 text-center hover:bg-red-600 sm:w-fit"
                              onClick={() => removeTimeRange(day, timeIndex)}
                            >
                              <TrashIcon
                                width={20}
                                height={20}
                                className=" m-auto text-white"
                              />
                            </Button>
                          </div>
                        )
                      )
                    ) : (
                      <p className="text-gray-500">Sin horario disponible</p>
                    )}
                  </div>
                  <Button
                    type="button"
                    className="w-fit"
                    onClick={() => addTimeRange(day)}
                  >
                    <PlusIcon width={20} height={20} />
                  </Button>
                </div>
              ))}
              <Button type="submit">Guardar</Button>
            </div>
          </form>
          <div className="w-full justify-center flex p-2">
            <a href="#" className="text-slate-700">
              @stalyndev
            </a>
          </div>
        </div>
        <div className="border border-gray-800 rounded-md p-10 w-1/2 h-fit m-auto flex flex-col justify-center gap-4">
          <div className="m-auto flex flex-col justify-center p-4">
            <h1 className="m-auto text-3xl font-bold">
              Horas disponibles por día:
            </h1>
            <span className="m-auto text-gray-500">
              Estas horas son para dias disponibles al dia
            </span>
          </div>
          <div className="flex flex-row gap-2 text-center justify-center">
            {Object.keys(schedule).map((day) => (
              <div key={day} className="mb-4">
                <h2 className="text-xl font-semibold text-center p-4">{day}</h2>
                {schedule[day].length > 0 ? (
                  <ul className="flex flex-col gap-2">
                    {schedule[day].map((time, index) => (
                      <li
                        key={index}
                        className="border border-slate-800 p-2 rounded-md"
                      >
                        <div className="flex flex-col gap-2 justify-center">
                          {generateHours(time).map((hour, i) => (
                            <div key={i} className="p-2 bg-slate-700 rounded">
                              {formatHour(getStartHour(time) + i)}
                            </div>
                          ))}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">Sin horario disponible</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </Card>
    </>
  );

  function generateHours(time) {
    const startHour = getStartHour(time);
    const endHour = getEndHour(time);
    const hours = [];

    for (let i = startHour; i <= endHour; i++) {
      hours.push(formatHour(i));
    }

    return hours;
  }

  function getStartHour(time) {
    return parseInt(time.start.split(":")[0]);
  }

  function getEndHour(time) {
    return parseInt(time.end.split(":")[0]);
  }

  function formatHour(hour) {
    return hour < 10 ? `0${hour}:00` : `${hour}:00`;
  }
}

export default ScheduleForm;
