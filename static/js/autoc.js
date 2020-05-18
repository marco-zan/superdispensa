new autoComplete({
    data: { // Data src [Array, Function, Async] | (REQUIRED)
        src: async() => {
            // API key token
            const token = "this_is_the_API_token_number";
            // User search query
            const query = document.querySelector("#autoComplete").value;
            // Fetch External Data Source
            const source = await fetch(`/prodotto/lista`);
            // Format data into JSON
            const data = await source.json();
            // Return Fetched data
            return data;
        },
        key: ["nome"],
        cache: true
    },
    // query: { // Query Interceptor               | (Optional)
    //     manipulate: (query) => {
    //         return query.replace("pizza", "burger");
    //     }
    // },
    // sort: (a, b) => { // Sort rendered results ascendingly | (Optional)
    //     if (a.match < b.match) return -1;
    //     if (a.match > b.match) return 1;
    //     return 0;
    // },
    placeHolder: placeHolder, // Place Holder text                 | (Optional)
    selector: "#autoComplete", // Input field selector              | (Optional)
    threshold: 1, // Min. Chars length to start Engine | (Optional)
    debounce: 300, // Post duration for engine to start | (Optional)
    searchEngine: "loose", // Search Engine type/mode           | (Optional)
    resultsList: { // Rendered results list object      | (Optional)
        render: true,
        container: source => {
            source.setAttribute("id", "trovati");
        },
        destination: document.querySelector("#autoComplete"),
        position: "afterend",
        element: "ul"
    },
    maxResults: 5, // Max. number of rendered results | (Optional)
    highlight: true, // Highlight matching results      | (Optional)
    resultItem: { // Rendered result item            | (Optional)
        content: typeof newContent !== 'undefined' ? newContent : (data, source) => {
            source.innerHTML = data.match;
            console.log(data, source)
        },
        element: "li"
    },
    noResults: () => { // Action script on noResults      | (Optional)
        const result = document.createElement("li");
        result.setAttribute("class", "no_result");
        result.setAttribute("tabindex", "1");
        result.innerHTML = "No Results";
        document.querySelector("#autoComplete_list").appendChild(result);
    },
    onSelection: onSelection
});