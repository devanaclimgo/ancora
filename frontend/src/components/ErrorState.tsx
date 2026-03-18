type Props = {
  title?: string;
  message?: string;
  onRetry?: () => void;
};

export default function ErrorState({
  title = "Oops... algo deu errado 😅",
  message = "Não conseguimos carregar os dados.",
  onRetry,
}: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-soft text-center max-w-sm">
        <h2 className="text-lg font-semibold text-primary mb-3">
          {title}
        </h2>

        <p className="text-sm text-gray-500 mb-4">
          {message}
        </p>

        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary transition"
          >
            Tentar novamente
          </button>
        )}
      </div>
    </div>
  );
}