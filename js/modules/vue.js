export function vue() {
  const { createApp } = Vue.createApp({
    created() {
      this.fetchStudios();
    },

    data() {
      return {
        studiosInfo: [],
        games: [],
        selectedStudioName: "",
        apiKey: "37e811b2cefd45699791ad049f48fb13", // add the provided API key in this field
        isFetchingGames: false,
        hasError: false,
        errorMessage: "",
      };
    },

    methods: {
      fetchStudios() {
        fetch("http://localhost/game-db/public/Studio")
          .then((res) => res.json())
          .then((data) => {
            this.studiosInfo = data;
          })
          .catch((error) => {
            console.error("Error fetching studios:", error);
            this.hasError = true;
            this.errorMessage = "There was a problem fetching the studios.";
          });
      },

      getPlatformIcon(platformName) {
        const platformIconMap = {
          "PlayStation 4": "images/icons/ps4.svg",
          "Xbox One": "images/icons/xbox.svg",
          PC: "images/icons/pc.svg",
          "Nintendo Switch": "images/icons/switch.svg",
          // Add more platforms and their icons here
        };
        return platformIconMap[platformName] || "images/icons/default.svg";
      },

      fetchGamesByPublisher(publisherName) {
        this.isFetchingGames = true;
        this.games = [];
        this.hasError = false;
        this.errorMessage = "";
        const formattedPublisherName = publisherName
          .replace(/\s+/g, "-")
          .toLowerCase();

        fetch(
          `https://api.rawg.io/api/games?publishers=${formattedPublisherName}&key=${this.apiKey}`
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.results.length > 0) {
              this.games = data.results.map((game) => ({
                id: game.id || "Not available",
                name: game.name || "Not available",
                image: game.background_image || "Not available",
                rating: game.rating ? game.rating.toString() : "Not available",
                platforms:
                  game.platforms.map((platform) => ({
                    name: platform.platform.name,
                    icon: this.getPlatformIcon(platform.platform.name),
                  })) || [],
              }));
            } else {
              this.hasError = true;
              this.errorMessage = "No games found for this publisher.";
            }
          })
          .catch((error) => {
            console.error("Fetch error:", error);
            this.hasError = true;
            this.errorMessage = "There was a problem fetching the games.";
          })
          .finally(() => {
            this.isFetchingGames = false;
          });
      },

      selectStudio(studio) {
        this.selectedStudioName = studio.name;
        this.fetchGamesByPublisher(studio.name);
      },
    },
  }).mount("#app");
}
