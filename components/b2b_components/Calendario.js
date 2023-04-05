import { useState } from 'react';
import cn from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/swiper-bundle.css';

SwiperCore.use([Navigation]);

function Calendario({arrdatas}) {
  const hoje = new Date();
  const [mesAtual, setMesAtual] = useState(hoje.getMonth() + 1);
  const [anoAtual, setAnoAtual] = useState(hoje.getFullYear());
  console.log(arrdatas)
  const entradaStr = '2023-04-01';
  const saidaStr = '2023-04-03';

  const arrdatasMesAtual = arrdatas.filter(({ entrada, saida }) => {
    const entradaDate = new Date(entrada);
    const saidaDate = new Date(saida);
    return entradaDate.getMonth() + 1 === mesAtual && saidaDate.getMonth() + 1 === mesAtual;
  });

  const entrada = new Date(entradaStr);
  const saida = new Date(saidaStr);

  const diasPeriodo = (saida - entrada) / (1000 * 60 * 60 * 24) + 1;
  const datas = [];

  for (let i = 0; i < diasPeriodo; i++) {
    const data = new Date(entrada.getTime() + i * 24 * 60 * 60 * 1000);
    datas.push(data.toISOString().slice(0, 10));
  }

  const isDiaPeriodo = (dia, mes, ano) => {
    const diaDate = new Date(ano, mes - 1, dia);
    return arrdatas.some(
      ({ entrada, saida }) => 
        diaDate.getTime() >= new Date(entrada).getTime() && diaDate.getTime() <= new Date(saida).getTime()
    );
  };

  const diasMeses = [];

  for (let ano = anoAtual; ano <= anoAtual + 1; ano++) {
    for (let mes = 1; mes <= 12; mes++) {
      // Verifica se o mês atual já passou
      if (ano < hoje.getFullYear() || (ano === hoje.getFullYear() && mes < hoje.getMonth() + 1)) {
        continue;
      }

      const diasMes = Array.from({ length: new Date(ano, mes, 0).getDate() }, (_, i) => i + 1);
      diasMeses.push({ ano, mes, diasMes });
    }
  }

  const meses = {
    1: 'Janeiro',
    2: 'Fevereiro',
    3: 'Março',
    4: 'Abril',
    5: 'Maio',
    6: 'Junho',
    7: 'Julho',
    8: 'Agosto',
    9: 'Setembro',
    10: 'Outubro',
    11: 'Novembro',
    12: 'Dezembro',
  };

  const getHospedeByDate = (ano, mes, dia) => {
    const diaDate = new Date(ano, mes - 1, dia);
    const reserva = arrdatas.find(
      ({ entrada, saida }) => diaDate >= new Date(entrada) && diaDate <= new Date(saida)
    );
    const hospede = reserva ? reserva.hospede : '';
    return hospede.length > 15 ? hospede.slice(0, 11) + '...' : hospede;
  };

  const handleSlideChange = (swiper) => {
    const { activeIndex } = swiper;
    const proximoMes = activeIndex % 12 + 1;
    const proximoAno = anoAtual + Math.floor(activeIndex / 12);
    setMesAtual(proximoMes);
    setAnoAtual(proximoAno);
  };
  return (
    <div className='calendario-container'>
      <h3>{meses[mesAtual]} - {anoAtual}</h3>
      <Swiper navigation onSlideChange={handleSlideChange}>
        {diasMeses.map(({ ano, mes, diasMes }) => (
          <SwiperSlide key={`${ano}-${mes}`}>
            <div className="calendario">
              {diasMes.map((dia) => (
                <div
                  key={`${ano}-${mes}-${dia}`}
                  className={cn('calendario-dia', {
                    'calendario-dia-periodo': isDiaPeriodo(dia, mes, ano)
                  })}
                >
                  {dia}
                  <div className='calendario-dia-hospede'>
                    {getHospedeByDate(ano, mes, dia)}
                  </div>
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Calendario;