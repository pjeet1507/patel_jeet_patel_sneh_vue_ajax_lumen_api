export function vue() {
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
        apiKey: "37e811b2cefd45699791ad049f48fb13",
        isFetchingGames: false,
        hasError: false,
        errorMessage: "",
        searchQuery: "",
      };
    },

    methods: {
      fetchStudios() {
        fetch("http://localhost/game-luman/public/Studio")
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
          "Xbox One": "images/icons/xbox.svg",
          "Xbox 360": "images/icons/xbox.svg",
          "Xbox Series S/X": "images/icons/xbox.svg",
          "PlayStation 5": "images/icons/ps4.svg",
          "PlayStation 4": "images/icons/ps4.svg",
          "PlayStation 3": "images/icons/ps4.svg",
          "PS Vita": "images/icons/ps4.svg",
          macOS: "images/icons/IOS.svg",
          PC: "images/icons/pc.svg",
          iOS: "images/icons/IOS.svg",
          Linux: "images/icons/Linux.svg",
          Android: "images/icons/Android.svg",
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
    mounted() {
      gsap.from(".title-text", {
        opacity: 0,
        y: "100%",
        duration: 1.5,
        stagger: 0.5,
        ease: "power4.out",
        onComplete: function () {},
      });

      gsap.from(".card", {
        opacity: 0,
        y: "100%",
        duration: 1,
        stagger: 0.2, // Adjust the stagger value as needed
        ease: "power4.out",
        onComplete: function () {},
      });
    },
  }).mount("#app");
}
