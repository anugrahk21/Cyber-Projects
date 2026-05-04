from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from api.password_tool import PasswordTool

app = FastAPI(title="Password Tool API")

# Add CORS middleware to allow requests from the frontend during development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

tool = PasswordTool()

class PasswordCheckRequest(BaseModel):
    password: str

class PasswordGenerateRequest(BaseModel):
    length: int = 12
    include_symbols: bool = True
    exclude_ambiguous: bool = True

@app.post("/api/check-strength")
async def check_strength(req: PasswordCheckRequest):
    return tool.check_password_strength(req.password)

@app.post("/api/generate")
async def generate(req: PasswordGenerateRequest):
    pwd = tool.generate_password(
        length=req.length,
        include_symbols=req.include_symbols,
        exclude_ambiguous=req.exclude_ambiguous
    )
    result = tool.check_password_strength(pwd)
    return {"password": pwd, "analysis": result}

@app.post("/api/check-breach")
async def check_breach(req: PasswordCheckRequest):
    return tool.check_password_breach(req.password)
