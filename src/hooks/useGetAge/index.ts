import { useCallback, useEffect, useState } from 'react';
import moment from 'moment';

export default function useGetAge(): number {
    const getAge = useCallback(
        () => moment().diff(moment('2000-03-23'), 'years'),
        [],
    );

    const [age, setAge] = useState(getAge());

    useEffect(() => {
        const timeout = setTimeout(() => {
            setAge(getAge());
        }, 1000);

        return () => {
            clearTimeout(timeout);
        };
    }, [getAge]);

    return age;
}
