import { describe, it, expect } from 'vitest'
import Header from '../Header.vue';
import { mount } from '@vue/test-utils'
import { RouterLink } from 'vue-router';
import router from '../../router/index';

vi.mock("@/services/authService.js", () => {
  function useAuthService() {
    return {
      auth: vi
        .fn()
        .mockResolvedValue({id:1, name:"Loick", firstname:"Hommet"}),
    };
  }
  return { useAuthService };

});

describe('Test du header connecter', () => {

  it("Lien vers la page profil", async ()=> {
    const wrapper = mount(Header, {
      global: {
        plugins: [router]
      }
    })
    const aRef = wrapper.find("a[data-test-profil='loick']");
    console.log(aRef.text())
    expect(aRef.text()).toBe("Profil")
  })

})
