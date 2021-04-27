import QRCode from 'react-qr-code';
import style from './Pip.module.css';
import Paginator from '../../../common/components/views/Paginator';
import NavLogo from '../../../common/components/nav/NavLogo';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { formatDisplay } from '../../../common/dateConfig';
import { ReactComponent as Emptyimage } from '../../../assets/images/empty.svg';

export default function Pip(props) {
  const { time, backstageEvents, selectedId, general } = props;
  const [size, setSize] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    const h = ref.current.clientHeight;
    const w = ref.current.clientWidth;
    setSize(`${w} x ${h}`);
  }, []);

  // Set window title
  useEffect(() => {
    document.title = 'ontime - Pip';
  }, []);

  // Format messages
  const showInfo =
    general.backstageInfo !== '' && general.backstageInfo != null;

  const stageTimer =
    time.currentSeconds != null && !isNaN(time.currentSeconds)
      ? formatDisplay(time.currentSeconds, true)
      : '';

  return (
    <div className={style.container__gray}>
      <NavLogo />

      <div className={style.eventTitle}>{general.title}</div>

      <div className={style.todayContainer}>
        <div className={style.label}>Today</div>
        <div className={style.entriesContainer}>
          <Paginator
            selectedId={selectedId}
            events={backstageEvents}
            limit={15}
            time={20}
          />
        </div>
      </div>

      <div className={style.pip} ref={ref}>
        <Emptyimage className={style.empty} />
        <span className={style.piptext}>{size}</span>
      </div>

      <AnimatePresence>
        {showInfo && (
          <motion.div className={style.infoContainer}>
            <div className={style.label}>Info</div>
            <div className={style.infoMessages}>
              <div className={style.info}>{general.backstageInfo}</div>
            </div>
            <div className={style.qr}>
              {general.url != null && general.url !== '' && (
                <QRCode
                  value='www.carlosvalente.com'
                  size={window.innerWidth / 12}
                  level='L'
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={style.clockContainer}>
        <div className={style.label}>Time Now</div>
        <div className={style.clock}>{time.clock}</div>
      </div>

      <div className={style.countdownContainer}>
        <div className={style.label}>Stage Timer</div>
        <div className={style.clock}>{stageTimer}</div>
      </div>
    </div>
  );
}
