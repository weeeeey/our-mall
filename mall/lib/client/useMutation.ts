// import {useMutation} from "react-query"
import axios from "axios";
import { useState } from "react";

interface UseMutaionState<T> {
    loading: boolean;
    data?: T;
    error?: object;
}

type UseMutationResult<T> = [(data: any) => void, UseMutaionState<T>];

const useMutation = <T = any>(url: string): UseMutationResult<T> => {
    const [state, setState] = useState<UseMutaionState<T>>({
        loading: false,
        data: undefined,
        error: undefined,
    });
    const mutation = (data: any) => {
        setState((prev) => ({ ...prev, loading: true }));
        axios({
            url,
            method: "post",
            data,
        })
            .then((response) => response.data.catch(() => {}))
            .then((datas) =>
                setState((prev) => ({ ...prev, datas, loading: false }))
            )
            .catch((error) =>
                setState((prev) => ({ ...prev, error, loading: false }))
            );
    };
    return [mutation, { ...state }];
};

export default useMutation;
