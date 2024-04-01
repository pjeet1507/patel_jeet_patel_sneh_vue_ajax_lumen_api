export function vue () {
  const { createApp } = Vue.createApp({
    created() {
      this.fetchStudios();
    },

    data() {
      return {
        studiosInfo: [],
        games: [], // Games fetched by selecting a studio
        searchResults: [], // Separate list for search results
        selectedStudioName: "",
        apiKey: "f9b9140095bf4e35a1c427fb3bfb4f11",
        isFetchingGames: false,
        hasError: false,
        errorMessage: "",
        searchQuery: "",

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
            this.isFetchingGames = false;
          })
          .catch((error) => {
            console.error("Fetch error:", error);
            this.hasError = true;
            this.errorMessage = "There was a problem fetching the games.";
            this.isFetchingGames = false;
          });
      },

      searchGames() {
        const query = this.searchQuery.replace(/\s+/g, "-").toLowerCase();
        this.isFetchingGames = true;
        this.searchResults = [];
        this.hasError = false;
        this.errorMessage = "";

        fetch(
          `https://api.rawg.io/api/games?search=${query}&key=${this.apiKey}`

        )
          .then((res) => res.json())
          .then((data) => {
            if (data.results.length > 0) {
              const filteredGames = data.results.filter(
                (game) => game.reviews_count > 1000
              );
              this.searchResults = filteredGames.map((game) => ({

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
              this.errorMessage = "No games found for the search query.";
            }
            this.isFetchingGames = false;
          })
          .catch((error) => {
            console.error("Search error:", error);
            this.hasError = true;
            this.errorMessage = "There was a problem searching for games.";

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

