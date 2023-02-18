import { Dispatch, SetStateAction } from "react";

type SetValue<T> = Dispatch<SetStateAction<T>>;

interface Website {
    title: string;
    favicon: string;
    url: string;
}


export type { Website, SetValue };