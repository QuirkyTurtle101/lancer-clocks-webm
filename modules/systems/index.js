const SUPPORTED_SYSTEMS = {
  "":""
};

const defaultLoadClockFromActor = ({ actor }) => {
  return {
    progress: actor.getFlag("lancer-clocks-webm", "progress"),
    size: actor.getFlag("lancer-clocks-webm", "size"),
    theme: actor.getFlag("lancer-clocks-webm", "theme"),
    webm: actor.getFlag("lancer-clocks-webm", "webm")
  };
};

const defaultPersistClockToActor = async ({ clock }) => {
  return {
    flags: {
      "lancer-clocks-webm": {
        progress: clock.progress,
        size: clock.size,
        theme: clock.theme,
        webm: clock.webm
      }
    }
  };
};

export const getSystemMapping = (id) => {
  const defaultSystemConfig = {
    loadClockFromActor: defaultLoadClockFromActor,
    persistClockToActor: defaultPersistClockToActor
  };

  if (!SUPPORTED_SYSTEMS[id]) {
		return {
		  id,
		  ...defaultSystemConfig,
		  registerSheetOptions: {
			types: (game.data.system?.template?.Actor?.types ?? game.data.template?.Actor?.types ?? game.model.Actor.types) //This shit is held together by hopes and dreams.
		  }
		};
  }

  return {
    id,
    ...defaultSystemConfig,
    ...SUPPORTED_SYSTEMS[id]
  };
};
