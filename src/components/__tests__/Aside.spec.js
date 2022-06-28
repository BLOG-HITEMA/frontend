import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Aside from '../Aside.vue';
import { RouterLink } from 'vue-router';
import router from '../../router/index';

describe('Test du composant Aside :', () => {
    const wrapper = mount(Aside, 
        {
            props: {
                active: true
            },
            global: {
                plugins: [router]
            }
        }
    );
    it('Affichage du composant', async () => {
        // Test de l'affichage du composant aside
        const accueilBtn = wrapper.find('a[data-test-id="accueilAside"]');
        const searchBtn = wrapper.find('a[data-test-id="searchAside"]')
        expect(searchBtn.exists());
        expect(accueilBtn.exists());
        expect(accueilBtn.text()).toBe('Accueil');
        expect(searchBtn.text()).toBe('Recherche');
    });
    /*it('Affichage du text area', async () => {
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
    });*/
});