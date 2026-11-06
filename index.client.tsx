import type { PluginClientContext } from "@getpaseo/plugin/client";
import { CompactThinking, compactThinkingSchema } from "./client/thinking";

export default function contribute(client: PluginClientContext) {
  const removeTransformer = client.addTimelineTransformer({
    id: "compact-thinking",
    query: { itemType: "reasoning" },
    transform: ({ item, phase }) => ({
      items: [
        {
          type: "plugin",
          kind: "compact-thinking",
          version: 1,
          data: { text: item.text, phase },
        },
      ],
    }),
  });

  const removeRenderer = client.addTimelineRenderer({
    kind: "compact-thinking",
    version: 1,
    schema: compactThinkingSchema,
    Component: CompactThinking,
  });

  return () => {
    removeTransformer();
    removeRenderer();
  };
}
