interface FeedbackMessagesProps {
  actionData?: {
    success?: boolean;
    message?: string;
    error?: string;
  };
}

export default function FeedbackMessages({ actionData }: FeedbackMessagesProps) {
  if (!actionData) return null;

  return (
    <>
      {actionData.success && "message" in actionData && (
        <div className="mb-6 p-4 bg-green-900/50 border border-green-700 rounded-lg">
          <p className="text-green-300" style={{ fontFamily: "Jakarta" }}>
            {actionData.message}
          </p>
        </div>
      )}

      {!actionData.success && "error" in actionData && (
        <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-lg">
          <p className="text-red-300" style={{ fontFamily: "Jakarta" }}>
            {actionData.error}
          </p>
        </div>
      )}
    </>
  );
}
