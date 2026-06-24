// Import the .NET runtime support
import { dotnet } from './_framework/dotnet.js'

// For a full list of options, see:
//   https://github.com/dotnet/runtime/blob/main/src/mono/browser/runtime/dotnet.d.ts
const { setModuleImports, getAssemblyExports, getConfig, runMain } = await dotnet
  // .withDiagnosticTracing(true)
  .withApplicationArguments("msgCanvas")
  .create();

// Return information about the environment and app. e.g. Environment variables (very few)
// runtimeConfig, assembly name, referenced assemblies etc
const config = getConfig();

// Get all the functions exposed in the main assembly by [JSExport], so that they
// can be invoked from JavaScript
const exports = await getAssemblyExports(config.mainAssemblyName);

// run the C# Main() method and keep the runtime process running and executing further API calls
await runMain();
