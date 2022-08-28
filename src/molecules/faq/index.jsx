import "./index.css";

export default function FAQ() {
  const faqData = [
    {
      question: "What is an NFT?",
      answer:
        "NFT stands for Non-Fungible Token. In simple terms, an NFT is basically data that act as a digital ledger. Each set of data is unique and one of a kind. An NFT could be a piece of drawn art or a digital token.",
    },
    {
      question: "How can I buy and Angels Club NFT?",
      answer:
        "Members of our community will be able to buy directly and only from our minting website when it is launched. Join our discord for further information about the launch.",
    },
    {
      question: 'What does "Mint" mean?',
      answer:
        "Minting an NFT is when a purchased digital art or content of any kind becomes a part of the Ethereum Blockchain.",
    },
    {
      question: "How much does it cost to buy an Angels Club NFT?",
      answer:
        "Information regarding the price as well as the minting date will be announced on our Discord soon.",
    },
    {
      question: "What is the available supply and how is it generated?",
      answer:
        "The collection is 2000 unique and programmatically generated art with over 150 drawn traits and features.",
    },
    {
      question: "Why would you choose Angels Club?",
      answer:
        "Our vision is not only to deliver sick art but to also provide passive income and much more exclusive utilities for our holders. With a great team on our side, we take pride in one-of-a-kind work that has not been done anywhere in the NFT space. For more information, visit our ROADMAP section.",
    },
  ];
  return (
    <div id="faq" className="faq-container">
      <h3 className="faq-title">FAQ</h3>
      <ul className="reset-list faq-list">
        {faqData.map((item, index) => (
          <li key={index}>
            <details className="faq-item-container" open={index === 0}>
              <summary className="faq-question">{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}
