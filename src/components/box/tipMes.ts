import {ElMessage} from "element-plus";

const aMessage = async (message: string) => {
    ElMessage({
        type: 'info',
        message: `${message}`,
    })
}

export default aMessage