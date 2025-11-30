import React from "react";
import { Icon } from "@iconify/react";

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "danger", // danger, warning, info
  loading = false
}) => {
  if (!isOpen) return null;

  const typeColors = {
    danger: {
      icon: "mdi:alert-circle",
      iconBg: "bg-red-500/20",
      iconColor: "text-red-400",
      button: "bg-red-500 hover:bg-red-600"
    },
    warning: {
      icon: "mdi:alert",
      iconBg: "bg-yellow-500/20",
      iconColor: "text-yellow-400",
      button: "bg-yellow-500 hover:bg-yellow-600"
    },
    info: {
      icon: "mdi:information",
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-400",
      button: "bg-blue-500 hover:bg-blue-600"
    }
  };

  const colors = typeColors[type];

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-background2 rounded-lg max-w-md w-full p-6 animate-slideUp">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className={`${colors.iconBg} p-4 rounded-full`}>
            <Icon
              icon={colors.icon}
              width="40"
              height="40"
              className={colors.iconColor}
            />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-white text-xl font-semibold text-center mb-2">
          {title}
        </h3>

        {/* Message */}
        <p className="text-body text-center mb-6">{message}</p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-6 py-3 rounded-lg border border-stroke text-white hover:bg-white/5 transition-colors disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 px-6 py-3 rounded-lg text-white font-medium transition-colors disabled:opacity-50 ${colors.button}`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <Icon
                  icon="mdi:loading"
                  className="animate-spin mr-2"
                  width="20"
                />
                Processing...
              </span>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
