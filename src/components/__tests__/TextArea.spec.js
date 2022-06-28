import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import TextArea from '../TextArea.vue';

describe('Test du composant TextArea :', () => {
    const wrapper = mount(TextArea, 
        {
            props: {
                label: "Label du composant",
                id: 1,
                name: "testTextArea",
                placeholder: 'Placeholder du composant',
                modelValue: ""
            }
        }
    );
    it('Affichage du label', async () => {
        // Test de l'affichage du label et de ses props
        const label = wrapper.find('label');
        expect(label.exists());
        expect(label.text()).toBe('Label du composant');
    });
    it('Affichage du text area', async () => {
        // Test de l'affichage du text area et de ses props
        const textArea = wrapper.find('textarea');
        expect(textArea.exists());
        expect(textArea.attributes().id).toBe('1');
        expect(textArea.attributes().name).toBe('testTextArea');
        expect(textArea.attributes().placeholder).toBe('Placeholder du composant');
    });
    it('Retour des données', async () => {
        // Test du retour de données de l'évènement de capture "input"
        // Déclenchement de l'évènement
        const textArea = wrapper.find('textarea');
        textArea.setValue('Hello World');
        // Vérification de l'évènement
        expect(wrapper.emitted()["update:modelValue"]).toBeTruthy();
        expect(wrapper.emitted()['update:modelValue'][0][0]).toBe('Hello World');
    });
});