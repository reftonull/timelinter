export const useToken = () => useState<string>("counter", () => "");
export const useUid = () => useState<string>("uid", () => "");
export const useEmail = () => useState<string>("email", () => "");

export const useTimelines = () => useState("timelines", () => {});
export const usePeople = () => useState("people", () => {});
