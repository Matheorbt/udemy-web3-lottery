import React from "react";
import web3 from "./web3";
import lottery from "./lottery";

class App extends React.Component {
    state = {
        manager: "",
        players: [],
        balance: "",
        value: "",
        message: "",
        accounts: [],
        currentYear: null,
        loading: false,
    };


    async componentDidMount() {
        const manager = await lottery.methods.manager().call();
        const players = await lottery.methods.getPlayers().call();
        const balance = await web3.eth.getBalance(lottery.options.address);
        const accounts = await web3.eth.getAccounts();
        const currentYear = new Date().getFullYear();

        this.setState({ manager, players, balance, accounts, currentYear });
    }

    onSubmit = async (event) => {
        event.preventDefault();

        const accounts = await web3.eth.getAccounts();

        this.setState({ message: "Waiting on transaction success..." });
        this.setState({ loading: true });

        try {
            await lottery.methods.enter().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, "ether"),
            });
            this.setState({ message: "You have been entered!" });
        } catch (error) {
            this.setState({ message: `Error: ${error.message}` });
        }
        this.setState({ loading: false });
    };

    onClick = async () => {
        const accounts = await web3.eth.getAccounts();

        this.setState({ message: "Waiting on transaction success..." });

        await lottery.methods.pickWinner().send({
            from: accounts[0],
        });

        this.setState({ message: "A winner has been picked !" });
    };

    render() {
        return (
            <main className="w-full flex justify-center items-center text-black">
                <div className="w-[90%] flex flex-col justify-around h-screen">
                    <h1 className="text-3xl sm:text-5xl font-bold py-1">Lottery Contract</h1>
                    <div className="p-6 shadow-md rounded-xl w-full flex flex-col gap-2 justify-around items-start font-inter">
                        <p className="text-left font-light md:w-9/12 w-11/12 text-base">
                            This contract is managed by <span className="uppercase font-medium">{this.state.manager}</span>. There are currently{" "}
                            <span className="font-medium">{this.state.players.length}</span> people entered, competing to win{" "}
                            <span className="font-medium">{web3.utils.fromWei(this.state.balance, "ether")}</span> ether !
                        </p>
                        <form onSubmit={this.onSubmit}>
                            <h4 className="">Want to try your luck?</h4>
                            <div className="flex flex-col">
                                <br />
                                <label className="">How much ether do you wanna bet ? (minimum value: 0.1 ether)</label>
                                <input
                                    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent border-none text-small"
                                    type="number"
                                    minimum="0.1"
                                    placeholder="Bet in ether"
                                    value={this.state.value}
                                    onChange={(event) => this.setState({ value: event.target.value })}
                                />
                                <button className="cta" disabled={this.state.loading}>Enter</button>
                            </div>
                        </form>
                            <h1 className="w-full">{this.state.message}</h1>
                    </div>
                    <div className="flex font-inter flex-col w-full justify-center items-center">
                        {this.state.accounts[0] === this.state.manager
                            ?
                            <div className="flex flex-col items-center">
                                <h1 className=" text-3xl sm:test-5xl py-2 text-gradient">Ready to pick a winner ?</h1>
                                <button className="cta" onClick={this.onClick}>Pick a winner!</button>
                            </div>
                            :
                            <div>
                                <h1 className=" text-3xl sm:test-5xl py-2 text-gradient">A manager will soon pick a winner !</h1>
                            </div>}
                    </div>
                    <footer className="font-inter p-5 flex flex-col w-full justify-center items-center">
                        <hr className="w-[90%]" />
                        <div className="flex flex-col justify-center items-center gap-3">
                            <span>This contract has been deployed to the <span className="font-medium">Goerli test network</span></span>
                            <span>Contract address : <a className="font-medium uppercase" href="https://goerli.etherscan.io/address/0x3168DCc0F6A9E8807e8E39c9bFe78416bBe40F63">0x3168DCc0F6A9E8807e8E39c9bFe78416bBe40F63</a></span>
                            <li className='order-1 self-center'>{`©${this.state.currentYear} Mathéo Robert`}</li>
                        </div>
                    </footer>
                </div>
            </main>
        );
    }
}
export default App;
