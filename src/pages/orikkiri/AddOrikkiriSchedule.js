import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { useEffect, useRef } from 'react';
import ko from "flatpickr/dist/l10n/ko";
function AddOrikkiriSchedule() {
    const dateTimeRef = useRef(null);

    useEffect(() => {
        flatpickr.localize(flatpickr.l10ns.ko);

        const today = new Date().setHours(0, 0, 0, 0);

        const config = {
            enableTime: true,
            dateFormat: 'Y-m-d H:i',
            altInput: true,
            altFormat: 'Y-m-d H:i',
            time_24hr: true,
            disable: [
                function (date) {
                    return date.getDay() === 0 || date.getDay() === 6;
                },
            ],
            locale: ko.ko,
            minDate: today,
            minuteIncrement: 30,
            minTime: '09:00',
            maxTime: '18:00',
            defaultHour: '09',
            defaultMinute: '00',
            inline: true,
        };

        dateTimeRef.current = flatpickr('input[type=datetime-local]', config);

        return () => {
            // 컴포넌트가 언마운트될 때 Flatpickr 인스턴스 제거
            if (dateTimeRef.current) {
                dateTimeRef.current.destroy();
            }
        };
    }, []); // 빈 배열은 컴포넌트가 마운트될 때 한 번만 실행

    return <><input class="form-control dateTime" type="datetime-local" required />
    
    </>;
}

export default AddOrikkiriSchedule;
