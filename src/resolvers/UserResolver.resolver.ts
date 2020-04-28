import { Resolver, Authorized, UseMiddleware, Query, Mutation, Args, Arg, Ctx } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Inject } from "typedi";
import * as bcrypt from "bcrypt";

import { User, Message } from "../entities";
import { UserInput, LoginArgs } from "./types";
import { Context } from "../types";
import { LogAction } from "../middleware";

@Resolver()
export class UserResolver {

  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  @Inject("SALT_ROUNDS")
  private readonly saltRounds: number;

  @Authorized()
  @UseMiddleware(LogAction)
  @Query(returns => User)
  async currentUser(
    @Ctx() ctx: Context
  ): Promise<User> {
    return ctx.user;
  }

  @UseMiddleware(LogAction)
  @Mutation(returns => User)
  async register(
    @Arg("user") userInput: UserInput,
    @Ctx() ctx: Context
  ): Promise<User> {
    const user = this.userRepository.create({
      ...userInput,
      password: await bcrypt.hash(userInput.password, this.saltRounds)
    });

    return await this.userRepository.save(user);
  }

  @UseMiddleware(LogAction)
  @Mutation(returns => User)
  async login(
    @Args() { email, password }: LoginArgs,
    @Ctx() ctx: Context
  ): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } })

    if (!user) throw new Error("Incorrect email or password.");

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) throw new Error("Incorrect email or password.");

    ctx.req.session.userId = user.id;
    ctx.req.session.userState =  await bcrypt.hash(ctx.req.sessionID, this.saltRounds);

    return user;
  }

  @Authorized()
  @UseMiddleware(LogAction)
  @Mutation(returns => Message)
  async logout(
    @Ctx() ctx: Context
  ): Promise<Message> {
    return new Promise((res, rej) => 
      ctx.req.session.destroy(err => {
        if (err) {
          throw new Error(err);
          rej({ message: "Logout unsuccessful." });
        }
        res({ message: "Successfully logged out." });
      })
    )
  }
}
