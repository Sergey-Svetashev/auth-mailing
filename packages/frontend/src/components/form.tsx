export const Form = ({ isLogin }: { isLogin?: boolean }) => (
  <form action={isLogin ? "/sign-up" : "log-in"} method="POST">
    <div className="form-control">
      <label htmlFor="email">E-Mail</label>
      <input type="email" name="email" id="email" />
    </div>
    <div className="form-control">
      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" />
    </div>
    {isLogin && (
      <div className="form-control">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" name="confirmPassword" id="confirmPassword" />
      </div>
    )}
    <button className="btn" type="submit">
      Sign up
    </button>
  </form>
);
