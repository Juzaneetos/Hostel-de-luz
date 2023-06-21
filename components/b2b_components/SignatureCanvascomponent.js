import { useRef } from 'react';
import SignaturePad from 'react-signature-pad-wrapper';

const SignatureField = () => {
  const signatureRef = useRef();

  const handleClear = () => {
    signatureRef.current.clear();
  };

  const handleSave = () => {
    const base64Image = signatureRef.current.toDataURL();
    // Aqui você pode enviar o base64Image para o Firebase
    // usando a biblioteca do Firebase.
  };

  return (
    <div>
      <SignaturePad
        ref={signatureRef}
        canvasProps={{ width: 400, height: 200 }}
      />
      <button onClick={handleClear}>Limpar</button>
      <button onClick={handleSave}>Salvar</button>
    </div>
  );
};

export default SignatureField;
