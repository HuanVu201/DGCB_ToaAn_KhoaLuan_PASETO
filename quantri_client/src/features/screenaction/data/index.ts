import { IScreen } from "@/features/screen/models";
import { Rule } from "antd/es/form";

export const INPUT_RULES : Record<keyof Pick<IScreen, "ma">, Rule[]> = {
    ma: [{required : true, message : "Không được để trống!"}],
}