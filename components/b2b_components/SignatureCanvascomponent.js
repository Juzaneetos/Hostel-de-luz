import { useEffect, useRef } from 'react';
import SignaturePad from 'signature_pad';
const SignatureField = () => {
  const canvasRef = useRef(null);
  const signaturePadRef = useRef(null);

  useEffect(() => {
    const signaturePad = new SignaturePad(canvasRef.current);

    // Redimensionar o campo de assinatura para corresponder ao tamanho do contêiner
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      const ratio = Math.max(window.devicePixelRatio || 1, 1);

      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      canvas.getContext('2d').scale(ratio, ratio);

      signaturePad.clear(); // Limpar a assinatura ao redimensionar o campo
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    signaturePadRef.current = signaturePad;

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const handleClear = () => {
    signaturePadRef.current.clear();
  };

  const handleSave = () => {
    const base64Image = signaturePadRef.current.toDataURL();
    // Aqui você pode enviar o base64Image para o Firebase
    // usando a biblioteca do Firebase.
  };

  return (
    <div>
      <canvas ref={canvasRef} />
      <button onClick={handleClear}>Limpar</button>
      <button onClick={handleSave}>Salvar</button>
    </div>
  );
};

export default SignatureField;
