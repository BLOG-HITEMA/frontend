import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Aside from '../Aside.vue';
import router from '../../router/index';

vi.mock("@/services/authService.js", () => {
    function useAuthService() {
        return {
            auth: vi.fn().mockResolvedValue({id:1, name:"Loick", firstname:"Hommet"}),
            disconnect: vi.fn().mockReturnValue('Hello World')
        };
    }
    return { useAuthService };  
});

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
    it("Test de la déconnexion de l'utilisateur", async () => {
        const disconnectBtn = wrapper.find('button');
        expect(disconnectBtn.text()).toBe('Déconnexion');
        await disconnectBtn.trigger('click');
        expect(wrapper.emitted().click).toHaveLength(1);
    });
});