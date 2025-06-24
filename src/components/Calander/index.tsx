import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getHistoryCounts } from '@app/services/UserHistoryService';
import { useLocalization } from '@app/hooks';
import { LANGUAGE_CONVERT_OBJ } from '@app/constants';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface CalendarProps {
  initialDate?: Date;
  setDate?: (date: string) => void;
}

const CalendarComponent: React.FC<CalendarProps> = ({ initialDate = new Date(), setDate }) => {
  const { i18n } = useLocalization();
  const [value, onChange] = useState<Value>(initialDate);
  const [dates, setDates] = useState<Date[]>([]);

  const isTargetDate = (date: Date) => {
    return dates.some((d) => date.toDateString() === d.toDateString());
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      return isTargetDate(date) ? <span style={{ color: 'red', fontSize: '1.2em' }}> *</span> : null;
    }
    return null;
  };

  const handleActiveStartDateChange = (date: Date) => {
    onChange(date);
  };

  const handleDayChange = (date: Date) => {
    if (setDate) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      setDate(formattedDate);
    }
  };

  useEffect(() => {
    const getHistory = async () => {
      try {
        const getYear = value instanceof Date ? value.getFullYear().toString() : '';
        const response = await getHistoryCounts(getYear);
        setDates(
          response?.data?.map((item: any) => {
            return new Date(item?.date);
          }) ?? [],
        );
      } catch (error: any) {
        console.error('Error:', error);
      }
    };

    getHistory();
  }, [value]);

  return (
    <div>
      <Calendar
        onChange={(date) => handleDayChange(date as Date)}
        value={value}
        tileContent={tileContent}
        onActiveStartDateChange={({ activeStartDate }) => handleActiveStartDateChange(activeStartDate as Date)}
        className="shadow-xl"
        locale={(LANGUAGE_CONVERT_OBJ as any)[(i18n as any)?.resolvedLanguage]}
      />
    </div>
  );
};

export default CalendarComponent;
