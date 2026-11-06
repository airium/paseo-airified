import type { PluginTimelineItemProps } from "@getpaseo/plugin/client";
import { Icon, Markdown } from "@getpaseo/plugin/client/ui";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { z } from "zod";
import { formatThinkingMarkdown } from "./format-markdown";

export const compactThinkingSchema = z.object({
  text: z.string(),
  phase: z.enum(["streaming", "complete"]),
});

type ThinkingData = z.output<typeof compactThinkingSchema>;

export function CompactThinking({ item, theme, layout }: PluginTimelineItemProps<ThinkingData>) {
  const [expanded, setExpanded] = useState(false);
  const { text, phase } = item.data;
  const muted = theme.colors.foregroundMuted;

  // Match Paseo's ExpandableBadge rail: -13 outer margin, 8 px padding, 22 px icon slot.
  return (
    <View style={{ minWidth: 0, marginHorizontal: -13 }} testID="compact-thinking">
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={phase === "streaming" ? "Thinking, in progress" : "Thinking"}
        accessibilityHint="Show or hide reasoning"
        accessibilityState={{ expanded }}
        aria-expanded={expanded}
        onPress={() => setExpanded((value) => !value)}
        style={({ pressed }) => ({
          flexDirection: "row",
          alignItems: "center",
          minHeight: layout.compact ? 40 : 28,
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderWidth: 1,
          borderColor: "transparent",
          opacity: pressed ? 0.7 : 1,
        })}
        testID="compact-thinking-toggle"
      >
        <View
          style={{
            width: 22,
            height: 22,
            marginRight: 4,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              marginLeft: -4,
              transform: [{ scale: 1.3 }, { rotate: expanded ? "90deg" : "0deg" }],
            }}
          >
            <Icon name="ChevronRight" size={12} color={muted} />
          </View>
        </View>
        <Text style={{ color: muted, fontSize: 14, lineHeight: 20, flexShrink: 0 }}>
          {phase === "streaming" ? "Thinking…" : "Thinking"}
        </Text>
      </Pressable>
      {expanded ? (
        <View
          style={{
            marginLeft: 20,
            marginTop: 2,
            marginBottom: 6,
            paddingLeft: 14,
            paddingRight: 8,
            paddingVertical: 2,
            borderLeftWidth: 1,
            borderLeftColor: theme.colors.border,
          }}
          testID="compact-thinking-details"
        >
          <Markdown>{formatThinkingMarkdown(text)}</Markdown>
        </View>
      ) : null}
    </View>
  );
}
