import React from "react";
import { Link } from "react-router-dom";

export const EmptyState = ({
  icon: Icon,
  title,
  description,
  actionText,
  actionLink,
  onAction
}) => {
  return (
    <div className="text-center py-16 px-4 max-w-md mx-auto">
      {Icon && (
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-soft/60 flex items-center justify-center text-primary">
          <Icon className="w-8 h-8 stroke-[1.5]" />
        </div>
      )}
      <h3 className="font-serif text-2xl font-medium text-dark mb-2">{title}</h3>
      <p className="text-dark-muted text-sm leading-relaxed mb-6">{description}</p>
      {actionText && (
        actionLink ? (
          <Link
            to={actionLink}
            className="luxury-btn luxury-btn-primary px-6 py-2.5 rounded-sm text-sm tracking-wide"
          >
            {actionText}
          </Link>
        ) : (
          <button
            onClick={onAction}
            className="luxury-btn luxury-btn-primary px-6 py-2.5 rounded-sm text-sm tracking-wide"
          >
            {actionText}
          </button>
        )
      )}
    </div>
  );
};
