import  NavBar  from "../../../components/Header/NavBar";


const FeedbackPage = () => {
  return (
    <div className="bg-background text-foreground">
          <header>
        <NavBar />
      </header>
      <h1 className="text-3xl font-bold mb-4 mt-5">How can we make daily.dev better?</h1>
      <p className="mb-8">
        Below, you’ll find all the options to directly communicate your needs to our team. In case your feedback
        includes sensitive personal information feel free to email us at
        <a href="mailto:support@daily.dev" className="text-primary">
        </a>
        .
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card p-6 rounded-lg shadow-lg">
          <img
            aria-hidden="true"
            alt="light bulb"
            src="https://openui.fly.dev/openui/24x24.svg?text=💡"
            className="mb-4"
          />
          <h2 className="text-xl font-semibold">Feature request</h2>
          <p className="text-muted-foreground">Have an idea for a new feature? Click below to submit it.</p>
          <button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 mt-4 p-2 rounded">
            REQUEST
          </button>
        </div>

        <div className="bg-card p-6 rounded-lg shadow-lg">
          <img
            aria-hidden="true"
            alt="bug"
            src="https://openui.fly.dev/openui/24x24.svg?text=🐛"
            className="mb-4"
          />
          <h2 className="text-xl font-semibold">Report a bug</h2>
          <p className="text-muted-foreground">
            Uh oh. Is something broken? Please help us fix it by submitting an issue.
          </p>
          <button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 mt-4 p-2 rounded">
            REPORT
          </button>
        </div>

        <div className="bg-card p-6 rounded-lg shadow-lg">
          <img
            aria-hidden="true"
            alt="feedback"
            src="https://openui.fly.dev/openui/24x24.svg?text=✏️"
            className="mb-4"
          />
          <h2 className="text-xl font-semibold">General feedback</h2>
          <p className="text-muted-foreground">Anything else you’d like us to know? We’re listening!</p>
          <button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 mt-4 p-2 rounded">
            SUBMIT
          </button>
        </div>
      </div>

      <div className="bg-card p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold">Let’s talk</h2>
        <p className="text-muted-foreground">
          We love meeting devs from our community! In this session, we will talk about how can we help you get the
          most out of our product :)
        </p>
        <button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 mt-4 p-2 rounded">
          SCHEDULE A MEETING
        </button>
      </div>
    </div>
  );
};

export default FeedbackPage;
