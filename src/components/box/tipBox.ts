import {Action, ElMessage, ElMessageBox} from "element-plus";

const aMessageBox = async (title: string, message: string, confirmButtonText: string) => {
    await ElMessageBox({
        title: title,
        message: message,
        confirmButtonText: confirmButtonText,
        callback: (action: Action) => {
            ElMessage({
                type: 'info',
                message: `action: ${action}`,
            })
        },
    });
}

export default aMessageBox