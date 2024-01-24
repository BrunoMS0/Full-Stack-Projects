import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/model/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
    try {
        const userID = await getDataFromToken(request);
        const user = await User.findOne({_id: userID}).select("-password");
        //the symbol '-' means i dont want that property(password)
        // with select you can choose what property you want

        return NextResponse.json(
            {
                message: "User found",
                data: user
            }
        );
    } catch (error: any) {
        return NextResponse.json(
            {error: error.message},
            {status: 400}
        );

    }
}