export default function PopupBoxContainer({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="h-screen flex justify-center items-center w-full">
        {children}
      </div>
    </div>
  );
}
