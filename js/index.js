$(function() {
  const yogi = "https://upload.wikimedia.org/wikipedia/commons/6/6b/Yogi_Berra_1956.png"
  const samb = "https://upload.wikimedia.org/wikipedia/commons/f/f9/Samuel_Beckett_01-2.jpg"

  $("#run-button").on("click", function(event) {
    event.preventDefault();

    //convert each quote to an array of floats between 0 and 1
    const encoder = (str) => {
       const arr = str.split('');
       const encoded = arr.map(e => (e.charCodeAt(0) / 256));
       console.log(encoded);
       return encoded;
    }

    const input = encoder($("#brain-input").val().trim());

    //map encoded strings to new array of objects
    const data = quotes.map(quote => {
       return {
          input: encoder(quote.input),
          output: quote.output
       }
    });

    console.table("data ", data);

    const net = new brain.NeuralNetwork();
    net.train(data, {
      log: true,
      logPeriod: 1000,
      iterations: 20000,
      learningRate: 0.1
    });


    const output = net.run(input);

    if (output.beckett > output.berra) {
      $("#brain-data").empty();
      $("#brain-data").append(`<img src=${samb} width="360px">`)
    } else {
      $("#brain-data").empty();
      $("#brain-data").append(`<img src=${yogi} width="360px">`)
    }

  });
});
