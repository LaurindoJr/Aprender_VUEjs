import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import AppButton from '../AppButton.vue';

describe('AppButton.vue', () => {
  it('deve renderizar o conteúdo do slot corretamente', () => {
    const wrapper = mount(AppButton, {
      slots: {
        default: 'Clique aqui',
      },
    });
    expect(wrapper.text()).toContain('Clique aqui');
  });

  it('deve aplicar a classe "primary" por padrão', () => {
    const wrapper = mount(AppButton);
    expect(wrapper.classes()).toContain('primary');
  });

  it('deve aplicar a classe "secondary" quando a variante é "secondary"', () => {
    const wrapper = mount(AppButton, {
      props: {
        variant: 'secondary',
      },
    });
    expect(wrapper.classes()).toContain('secondary');
    expect(wrapper.classes()).not.toContain('primary');
  });

  it('deve desabilitar o botão quando a prop disabled é true', async () => {
    const wrapper = mount(AppButton, {
      props: {
        disabled: true,
      },
    });
    const button = wrapper.find('button');
    expect(button.attributes().disabled).toBeDefined();
    expect(button.element.disabled).toBe(true);

    await button.trigger('click');
    expect(wrapper.emitted().click).toBeUndefined();
  });

  it('deve emitir o evento click quando o botão é clicado e não está desabilitado', async () => {
    const wrapper = mount(AppButton);
    const button = wrapper.find('button');

    await button.trigger('click');
    expect(wrapper.emitted().click).toBeDefined();
    expect(wrapper.emitted().click?.length).toBe(1);
  });

  it('não deve emitir o evento click quando o botão está desabilitado', async () => {
    const wrapper = mount(AppButton, {
      props: {
        disabled: true,
      },
    });
    const button = wrapper.find('button');

    await button.trigger('click');
    expect(wrapper.emitted().click).toBeUndefined();
  });
});
