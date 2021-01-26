import React, { useState } from 'react';
import cx from 'clsx';
import { ActionIcon } from '@mantine/core';
import { DotsHorizontalIcon } from '@modulz/radix-icons';
import { TagPickerColor, TagPickerTag } from '../types';
import TagEdit from '../TagEdit/TagEdit';
import TagBadge from '../TagBadge/TagBadge';
import classes from './TagItem.styles.less';

interface TagItemProps {
  index: number;
  hovered: number;
  data: TagPickerTag;
  colors: TagPickerColor[];
  deleteLabel: string;
  onSelect(value: TagPickerTag): void;
  onTagUpdate(id: string, values: Omit<TagPickerTag, 'id'>): void;
  onTagDelete(id: string): void;
  onHover(index: number): void;
  onEventsCaptureChange(shouldCaptureEvents: boolean): void;
}

export default function TagItem({
  index,
  hovered,
  data,
  onSelect,
  onTagUpdate,
  onHover,
  deleteLabel,
  colors,
  onTagDelete,
  onEventsCaptureChange,
}: TagItemProps) {
  const [editDropdownOpened, setEditDropdownOpened] = useState(false);

  const openEditDropdown = () => {
    setEditDropdownOpened(true);
    onEventsCaptureChange(false);
  };

  const closeEditDropdown = () => {
    setEditDropdownOpened(false);
    onEventsCaptureChange(true);
  };

  return (
    <div
      className={cx(classes.item, { [classes.hovered]: hovered === index })}
      onMouseEnter={() => onHover(index)}
    >
      <TagEdit
        opened={editDropdownOpened}
        onClose={closeEditDropdown}
        initialValues={data}
        deleteLabel={deleteLabel}
        colors={colors}
        onTagUpdate={onTagUpdate}
        onTagDelete={onTagDelete}
        id={data.id}
      />

      <div className={classes.body}>
        <button type="button" className={classes.control} onClick={() => onSelect(data)}>
          <TagBadge data={data} />
        </button>

        <ActionIcon onClick={openEditDropdown}>
          <DotsHorizontalIcon />
        </ActionIcon>
      </div>
    </div>
  );
}

TagItem.displayName = '@mantine/tag-picker/TagItem';
