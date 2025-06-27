interface ModalProps {
    message: string;
    onClose: () => void;
  }
  
  export default function Modal({ message, onClose }: ModalProps) {
      return (
          <div className="fixed text-neutral-800 inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-sm w-full">
                  <p className="mb-6 text-lg">{message}</p>
                  <button onClick={onClose} className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors">Close</button>
              </div>
          </div>
      );
  }