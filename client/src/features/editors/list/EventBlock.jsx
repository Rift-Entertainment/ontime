import Icon from '@chakra-ui/icon';
import { FiChevronDown, FiChevronUp, FiMoreVertical } from 'react-icons/fi';
import { useMemo } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import EventTimes from 'common/components/eventTimes/EventTimes';
import EventTimesVertical from 'common/components/eventTimes/EventTimesVertical';
import EditableText from 'common/input/EditableText';
import ActionButtons from './ActionButtons';
import PublicIconBtn from 'common/components/buttons/PublicIconBtn';
import DeleteIconBtn from 'common/components/buttons/DeleteIconBtn';
import { millisToMinutes } from 'common/dateConfig';
import style from './EventBlock.module.css';
import { SelectCollapse, HandleCollapse } from 'app/context/collapseAtom';
import { useAtom } from 'jotai';
import EventTitlesSingle from './EventTitlesSingle';
import EventTitlesMultiple from './EventTitlesMultiple';

const ExpandedBlock = (props) => {
  const { provided, data, eventIndex, next, delay, delayValue, actionHandler } =
    props;

  console.log(`data.eventTitles`, data.eventTitles);

  const oscid = data.id.length > 4 ? '...' : data.id;

  // if end is before, assume is the day after
  const duration =
    data.timeStart > data.timeEnd
      ? data.timeEnd + 86400000 - data.timeStart
      : data.timeEnd - data.timeStart;

  return (
    <>
      <span className={style.drag} {...provided.dragHandleProps}>
        <FiMoreVertical />
      </span>

      <div className={style.indicators}>
        <span className={next ? style.next : style.nextDisabled}>Next</span>
        {delayValue != null && (
          <span className={style.delayValue}>+ {delayValue}</span>
        )}
      </div>
      <div className={style.timeExpanded}>
        <EventTimesVertical
          actionHandler={actionHandler}
          timeStart={data.timeStart}
          timeEnd={data.timeEnd}
          duration={duration}
          delay={delay}
          className={style.time}
        />
      </div>

      <div className={style.titles}>
        {2 > data.eventTitles?.length ? (
          <EventTitlesSingle
            data={data.eventTitles[0]}
            actionHandler={actionHandler}
            eventIndex={eventIndex}
            oscid={oscid}
          />
        ) : (
          <EventTitlesMultiple
            data={data.eventTitles[0]}
            actionHandler={actionHandler}
            eventIndex={eventIndex}
            oscid={oscid}
          />
        )}
      </div>

      <Icon
        className={style.more}
        as={FiChevronUp}
        marginTop='0.2em'
        gridArea='more'
        onClick={() => props.setCollapsed(true)}
      />
      <div className={style.actionOverlay}>
        <PublicIconBtn actionHandler={actionHandler} active={data.isPublic} />
        <ActionButtons
          showAdd
          showDelay
          showBlock
          actionHandler={actionHandler}
        />
        <DeleteIconBtn actionHandler={actionHandler} />
      </div>
    </>
  );
};

const CollapsedBlock = (props) => {
  const { provided, data, next, delay, delayValue, actionHandler } = props;

  return (
    <>
      <span className={style.drag} {...provided.dragHandleProps}>
        <FiMoreVertical />
      </span>

      <div className={style.indicators}>
        <span className={next ? style.next : style.nextDisabled}>Next</span>
        {delayValue != null && (
          <span className={style.delayValue}>+ {delayValue}</span>
        )}
      </div>
      <EventTimes
        actionHandler={actionHandler}
        timeStart={data.timeStart}
        timeEnd={data.timeEnd}
        delay={delay}
        className={style.time}
      />
      <div className={style.titleContainer}>
        <EditableText
          label='Title'
          defaultValue={data.title}
          placeholder='Add Title'
          submitHandler={(v) =>
            actionHandler('update', { field: 'title', value: v })
          }
        />
      </div>
      <Icon
        className={style.more}
        as={FiChevronDown}
        marginTop='0.2em'
        gridArea='more'
        onClick={() => props.setCollapsed(false)}
      />
      <div className={style.actionOverlay}>
        <PublicIconBtn actionHandler={actionHandler} active={data.isPublic} />
        <ActionButtons
          showAdd
          showDelay
          showBlock
          actionHandler={actionHandler}
        />
      </div>
    </>
  );
};

export default function EventBlock(props) {
  const { data, selected, delay, index, eventIndex, actionHandler } = props;
  const [collapsed] = useAtom(
    useMemo(() => SelectCollapse(data.id), [data.id])
  );
  const [, setCollapsed] = useAtom(HandleCollapse);

  // TODO: should this go inside useEffect()
  // Would I then need to add this to state?
  const isSelected = selected ? style.active : '';
  const isCollapsed = collapsed ? style.collapsed : style.expanded;
  const classSelect = `${style.event} ${isCollapsed} ${isSelected}`;

  // Calculate delay in min
  const delayValue = delay > 0 ? millisToMinutes(delay) : null;

  const handleCollapse = (isCollapsed) => {
    setCollapsed({ [data.id]: isCollapsed });
  };

  return (
    <Draggable key={data.id} draggableId={data.id} index={index}>
      {(provided) => (
        <div
          className={classSelect}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          {collapsed ? (
            <CollapsedBlock
              provided={provided}
              data={data}
              next={props.next}
              delay={delay}
              delayValue={delayValue}
              actionHandler={actionHandler}
              setCollapsed={handleCollapse}
            />
          ) : (
            <ExpandedBlock
              provided={provided}
              eventIndex={eventIndex}
              data={data}
              next={props.next}
              delay={delay}
              delayValue={delayValue}
              actionHandler={actionHandler}
              setCollapsed={handleCollapse}
            />
          )}
        </div>
      )}
    </Draggable>
  );
}
