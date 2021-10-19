import { imgBaseUrl } from '@/utils/env'

export default {
  methods: {
    formatHeroImg(hero_icon) {
      return `${imgBaseUrl}/files/mega_picture/hero/icon/${hero_icon}.png`
    },
    formatSkillImg(skill_id) {
      return `${imgBaseUrl}/files/mega_picture/skill/${skill_id}.png`
    }
  }
}
