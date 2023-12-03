import { reactive } from "vue";

interface Notification {
  id: number;
  message: string;
  type: string;
  icon: boolean;
}

const notifications = reactive<Notification[]>([]);

const addNotification = ({
  message,
  timeout = null,
  type = "info",
  icon = true,
}: {
  message: string;
  timeout?: number | null;
  type?: string;
  icon?: boolean;
}): void => {
  const id = Math.random() + Date.now();
  notifications.push({
    id,
    message,
    type,
    icon,
  });
  if (timeout) {
    setTimeout(() => removeNotification(id), timeout);
  }
};

const removeNotification = (id: number): void => {
  const index = notifications.findIndex((item) => item.id === id);
  if (index > -1) {
    notifications.splice(index, 1);
  }
};

export default function useNotifications() {
  return { notifications, addNotification, removeNotification };
}
