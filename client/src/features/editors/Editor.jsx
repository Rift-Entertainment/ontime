import { lazy, useEffect, useState } from 'react';
import { Box } from '@chakra-ui/layout';
import { useDisclosure } from '@chakra-ui/hooks';
import styles from './Editor.module.css';
import MenuBar from 'features/menu/MenuBar';
import ModalManager from 'features/modals/ModalManager';
import Manager from 'features/control/Manager';
import { FiChevronUp } from 'react-icons/fi';
import Icon from '@chakra-ui/icon';

const EventListWrapper = lazy(() =>
  import('features/editors/list/EventListWrapper')
);
const PlaybackControl = lazy(() => import('features/control/PlaybackControl'));
const MessageControl = lazy(() => import('features/control/MessageControl'));
const Info = lazy(() => import('features/info/Info'));

export default function Editor() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [infoCollapsed, setInfoCollapsed] = useState(false);
  const [managerCollapsed, setManagerCollapsed] = useState(false);

  // Set window title
  useEffect(() => {
    document.title = 'ontime - Editor';
  }, []);

  return (
    <>
      <ModalManager isOpen={isOpen} onClose={onClose} />

      <div className={styles.mainContainer}>
        <Box id='settings' className={styles.settings}>
          <MenuBar onOpen={onOpen} />
        </Box>

        <Box className={styles.editor}>
          <h1>Event List</h1>
          <div className={styles.content}>
            <EventListWrapper />
          </div>
        </Box>

        <Box className={styles.messages}>
          <h1>Display Messages</h1>
          <div className={styles.content}>
            <MessageControl />
          </div>
        </Box>

        <Box className={styles.playback}>
          <h1>Timer Control</h1>
          <div className={styles.content}>
            <PlaybackControl />
          </div>
        </Box>

        <div className={styles.infoLower}>
          <Box className={styles.info}>
            <h1>Info</h1>
            <Icon
              as={FiChevronUp}
              className={
                infoCollapsed ? styles.moreCollapsed : styles.moreExpanded
              }
              style={{ position: 'relative', left: '98%', top: '-2.5em' }}
              onClick={() => setInfoCollapsed((c) => !c)}
            />
            {infoCollapsed || (
              <div className={styles.content}>
                <Info />
              </div>
            )}
          </Box>

          <Box className={styles.manager}>
            <h1>Manager</h1>
            <FiChevronUp
              className={
                managerCollapsed ? styles.moreCollapsed : styles.moreExpanded
              }
              style={{ position: 'relative', left: '98%', top: '-2.5em' }}
              onClick={() => setManagerCollapsed((c) => !c)}
            />
            {managerCollapsed || (
              <div className={styles.content}>
                <Manager />
              </div>
            )}
          </Box>
        </div>
      </div>
    </>
  );
}
