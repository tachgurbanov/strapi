import React from 'react';
import PropTypes from 'prop-types';
import {
  ButtonModal,
  HeaderModal,
  HeaderModalTitle,
  Modal,
  ModalBody,
  ModalFooter,
  ModalForm,
} from 'strapi-helper-plugin';
import { FormattedMessage } from 'react-intl';
import { upperFirst } from 'lodash';
import { AttributeIcon } from '@buffetjs/core';

const PopupForm = ({
  headerId,
  isOpen,
  onClosed,
  onSubmit,
  onToggle,
  renderForm,
  subHeaderContent,
  type,
}) => {
  const getAttrType = () => {
    if (type === 'timestamp') {
      return 'date';
    }

    if (['decimal', 'float', 'integer', 'biginter'].includes(type)) {
      return 'number';
    }

    if (type === 'group') {
      return 'component';
    }

    return type;
  };
  return (
    <Modal isOpen={isOpen} onClosed={onClosed} onToggle={onToggle}>
      <HeaderModal>
        <section>
          <HeaderModalTitle style={{ textTransform: 'none' }}>
            <AttributeIcon
              type={getAttrType()}
              style={{ margin: 'auto 20px auto 0' }}
            />
            <FormattedMessage id={headerId} />
          </HeaderModalTitle>
        </section>
        <section>
          <HeaderModalTitle>
            <span>{upperFirst(subHeaderContent)}</span>
            <hr />
          </HeaderModalTitle>
        </section>
      </HeaderModal>
      <form onSubmit={onSubmit}>
        <ModalForm>
          <ModalBody>{renderForm()}</ModalBody>
        </ModalForm>
        <ModalFooter>
          <section>
            <ButtonModal
              message="components.popUpWarning.button.cancel"
              onClick={onToggle}
              isSecondary
            />
            <ButtonModal message="form.button.done" type="submit" />
          </section>
        </ModalFooter>
      </form>
    </Modal>
  );
};

PopupForm.defaultProps = {
  isOpen: false,
  onClosed: () => {},
  onSubmit: () => {},
  onToggle: () => {},
  renderForm: () => {},
  subHeaderContent: '',
  type: '',
};

PopupForm.propTypes = {
  headerId: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  onClosed: PropTypes.func,
  onSubmit: PropTypes.func,
  onToggle: PropTypes.func,
  renderForm: PropTypes.func,
  subHeaderContent: PropTypes.string,
  type: PropTypes.string,
};

export default PopupForm;
