import { Input } from '@chakra-ui/input';
import { Stack } from '@chakra-ui/layout';
import { Radio, RadioGroup } from '@chakra-ui/radio';
import { Select } from '@chakra-ui/select';
import EditableText from 'common/input/EditableText';
import EventBlock from 'features/editors/list/EventBlock';
import PropTypes from 'prop-types';
import style from './Manager.module.css';

function LowerManager(props) {
  const actionHandler = () => {
    console.log('action');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1vh' }}>
      <div className={style.titleContainer}>
        <EditableText
          label='Title'
          defaultValue={'test'}
          placeholder='Add Title'
          submitHandler={(v) =>
            actionHandler('update', { field: 'title', value: v })
          }
        />
        <EditableText
          label='Presenter'
          defaultValue={'testp'}
          placeholder='Add Presenter name'
          submitHandler={(v) =>
            actionHandler('update', { field: 'presenter', value: v })
          }
        />
        <EditableText
          label='Subtitle'
          defaultValue={'tests'}
          placeholder='Add Subtitle'
          submitHandler={(v) =>
            actionHandler('update', { field: 'subtitle', value: v })
          }
        />
      </div>
    </div>
  );
}

LowerManager.propTypes = {};

export default LowerManager;
