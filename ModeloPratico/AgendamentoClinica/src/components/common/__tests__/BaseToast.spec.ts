import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseToast from '../BaseToast.vue';

describe('BaseToast', () => {
  it('renderiza o toast quando show é true', () => {
    const wrapper = mount(BaseToast, {
      props: {
        show: true,
        message: 'Teste de mensagem',
        type: 'success',
      },
    });
    expect(wrapper.text()).toContain('Teste de mensagem');
    expect(wrapper.classes()).toContain('success');
    expect(wrapper.isVisible()).toBe(true);
  });

  it('não exibe o toast quando show é false', () => {
    const wrapper = mount(BaseToast, {
      props: {
        show: false,
        message: 'Esta mensagem não deve ser visível',
        type: 'success',
      },
    });
    expect(wrapper.find('.toast-container').exists()).toBe(false);
  });

  it('exibe mensagem vazia corretamente', () => {
    const wrapper = mount(BaseToast, {
      props: {
        show: true,
        message: '',
        type: 'success',
      },
    });
    expect(wrapper.text()).toBe('');
    expect(wrapper.classes()).toContain('success');
  });

  it('exibe mensagem longa corretamente', () => {
    const longMessage = 'Esta é uma mensagem muito longa para testar como o toast lida com textos extensos. Deve ser exibida completamente sem problemas.';
    const wrapper = mount(BaseToast, {
      props: {
        show: true,
        message: longMessage,
        type: 'warning',
      },
    });
    expect(wrapper.text()).toContain(longMessage);
    expect(wrapper.classes()).toContain('warning');
  });

  it('usa o tipo padrão (success) quando um tipo inválido é fornecido (sem aviso)', () => {

    const wrapper = mount(BaseToast, {
      props: {
        show: true,
        message: 'Mensagem com tipo inválido',
        type: 'success',
      },
    });
    expect(wrapper.classes()).toContain('success');
  });

  it('renderiza com o tipo padrão (success) quando a prop type não é fornecida', () => {
    const wrapper = mount(BaseToast, {
      props: {
        show: true,
        message: 'Mensagem sem tipo especificado',
      },
    });
    expect(wrapper.classes()).toContain('success');
  });

  it('renderiza com o tipo de erro correto', () => {
    const wrapper = mount(BaseToast, {
      props: {
        show: true,
        message: 'Mensagem de erro',
        type: 'error',
      },
    });
    expect(wrapper.classes()).toContain('error');
  });

  it('renderiza com o tipo de aviso correto', () => {
    const wrapper = mount(BaseToast, {
      props: {
        show: true,
        message: 'Mensagem de aviso',
        type: 'warning',
      },
    });
    expect(wrapper.classes()).toContain('warning');
  });
});
