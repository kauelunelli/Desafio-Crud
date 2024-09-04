import { useAlert } from "./AlertContext";
import { tv } from "tailwind-variants";

export const Alert = () => {
  const { alerts, removeAlert } = useAlert();

  const alertsVariants = tv({
    variants: {
      type: {
        success: "bg-green-100 text-green-800",
        error: "bg-red-100 text-red-800",
        info: "bg-blue-100 text-blue-800",
        warning: "bg-yellow-100 text-yellow-800",
      },
    },
  });

  return (
    <>
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`flex justify-between p-4 rounded-md ${alertsVariants({
            type: alert.type,
          })}`}
          onClick={() => removeAlert(alert.id)}
        >
          <div
            className={`flex w-64 items-center gap-2 ${alertsVariants({
              type: alert.type,
            })}`}
          >
            <strong className="block font-medium"> {alert.message} </strong>
          </div>
        </div>
      ))}
    </>
  );
};
