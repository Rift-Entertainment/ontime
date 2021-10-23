import PropTypes from 'prop-types';
import EditableText from 'common/input/EditableText';
import style from './EventBlock.module.css';
import AddIconBtn from 'common/components/buttons/AddIconBtn';
import VisibleIconBtn from 'common/components/buttons/VisibleIconBtn';
import DeleteIconBtn from 'common/components/buttons/DeleteIconBtn';

function EventTitlesMultiple(props) {
  const { data, actionHandler, eventIndex, oscid } = props;
  return (
    <div>
      <div className={style.titleContainer}>
        <EditableText
          label='Title'
          defaultValue={data.title}
          placeholder='Add Title'
          submitHandler={(v) =>
            actionHandler('update', { field: 'title', value: v })
          }
        />
        <span className={style.oscLabel}>
          {`/ontime/goto ${eventIndex + 1}  << OSC >> /ontime/gotoid ${oscid}`}
        </span>
      </div>
      <div className={style.add}>+</div>
      <div className={style.titleContainer}>
        <div className={style.childContainer}>
          <EditableText
            label='Presenter'
            defaultValue={data.presenter}
            placeholder='Add Presenter name'
            submitHandler={(v) =>
              actionHandler('update', { field: 'presenter', value: v })
            }
          />
          <EditableText
            label='Subtitle'
            defaultValue={data.subtitle}
            placeholder='Add Subtitle'
            submitHandler={(v) =>
              actionHandler('update', { field: 'subtitle', value: v })
            }
          />
          <EditableText
            label='Note'
            defaultValue={data.note}
            placeholder='Add Note'
            style={{ color: '#d69e2e' }}
            submitHandler={(v) =>
              actionHandler('update', { field: 'note', value: v })
            }
          />
        </div>
        <div className={style.add}>+</div>
      </div>
    </div>
  );
}

EventTitlesMultiple.propTypes = {
  data: PropTypes.exact({
    title: PropTypes.string.isRequired,
    presenter: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    note: PropTypes.string.isRequired,
  }),

  actionHandler: PropTypes.func.isRequired,
  eventIndex: PropTypes.number.isRequired,
  oscid: PropTypes.string,
};

export default EventTitlesMultiple;
